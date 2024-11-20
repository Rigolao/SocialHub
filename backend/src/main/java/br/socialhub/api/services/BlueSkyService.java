package br.socialhub.api.services;

import br.socialhub.api.dtos.blue_sky.*;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.Anexo;
import br.socialhub.api.models.Conta;
import br.socialhub.api.models.ContaPostagem;
import br.socialhub.api.models.Postagem;
import br.socialhub.api.repositories.AccountRepository;
import br.socialhub.api.utils.Util;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static br.socialhub.api.utils.Constantes.LINK_BLUESKY;

@Service
@Slf4j
@Getter
public class BlueSkyService {
    private static final String USERNAME = "socialhuboficial.bsky.social";
    private static final String PASSWORD = "s0ci@lhub1.";
    private static final Long BLUE_SKY_ACCOUNT_ID = 4L;

    private final RestTemplate restTemplate;
    private final AccountRepository accountRepository;

    private String accessJwt;
    private String did;

    public BlueSkyService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
        this.restTemplate = new RestTemplateBuilder().build();
    }

    public void auth() {
        String url = String.format("%s/%s", LINK_BLUESKY, "com.atproto.server.createSession");

        Map<String, String> requestBody = new HashMap<>();

        requestBody.put("identifier", USERNAME);
        requestBody.put("password", PASSWORD);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

        try {
            RestTemplate restTemplate = new RestTemplateBuilder().build();
            ResponseEntity<CreateSessionResponseDTO> response = restTemplate.postForEntity(url, request, CreateSessionResponseDTO.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                this.accessJwt = response.getBody().accessJwt();
                this.did = response.getBody().did();
                String refreshJwt = response.getBody().refreshJwt();

                log.info("Autenticado com sucesso no Bluesky API.");

                log.info("{\"acessJwt\":\"{}\", \"did\":\"{}\", \"refreshJwt\":\"{}\"}", this.accessJwt, this.did, refreshJwt);
            } else {
                log.error("Falha na autenticação do Bluesky API. Status: {}. Corpo da resposta: {}",
                        response.getStatusCode(), response.getBody());
            }
        } catch (HttpClientErrorException e) {
            log.error("Erro de cliente durante a autenticação no Bluesky API: {}", e.getMessage());
        } catch (ResourceAccessException e) {
            log.error("Erro de acesso ao recurso durante a autenticação no Bluesky API: {}", e.getMessage());
        } catch (Exception e) {
            log.error("Erro inesperado durante a autenticação no Bluesky API: {}", e.getMessage());
        }
    }


    public boolean createPost(String content, String did, String accessJwt) {
        String url = LINK_BLUESKY + "/com.atproto.repo.createRecord";

        Map<String, Object> record = new HashMap<>();
        record.put("text", content);
        record.put("createdAt", OffsetDateTime.now().toString());

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("collection", "app.bsky.feed.post");
        requestBody.put("repo", did);
        log.info("did: {}", this.did);
        log.info("didBanco: {}", did);
        requestBody.put("record", record);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessJwt);

        log.info("acessJwt: {}", this.accessJwt);
        log.info("acessJwtBanco: {}", accessJwt);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            RestTemplate restTemplate = new RestTemplateBuilder().build();
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                log.info("Postagem criada com sucesso no Bluesky.");
                return true;
            } else {
                log.error("Falha ao criar postagem no Bluesky: {}", response.getBody());
                return false;
            }
        } catch (Exception e) {
            log.error("Erro ao criar postagem no Bluesky: {}", e.getMessage());
            return false;
        }
    }

    public Conta getAccountBlueSky(Postagem postagem) {
        return postagem.getContaPostagens().stream()
                .map(ContaPostagem::getConta)
                .filter(conta -> conta.getSocialNetwork().getId().equals(BLUE_SKY_ACCOUNT_ID))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Não tem vinculo com bluesky"));
    }

    public boolean createPost(Postagem postagem) {
        Conta account = getAccountBlueSky(postagem);
        SessionInfoDTO session = refreshToken(account);

        String accessJwt = session.accessJwt();
        String did = session.did();

        String url = LINK_BLUESKY + "/com.atproto.repo.createRecord";

        if (postagem.getAnexos().isEmpty()) {
            return createPost(postagem.getDescricao(), did, accessJwt);
        }

        return createPost(postagem, url, accessJwt, did);
    }

    public boolean createPost(Postagem postagem, String url, String accessJwt, String did) {
        try {
            // Upload de mídia
            List<BlobResponseDTO> blobResponses = uploadMediaToBluesky(postagem.getAnexos(), accessJwt);

            // Criação do EmbedDTO com a lista de imagens
            EmbedDTO embed = buildEmbed(blobResponses);

            // Criação do objeto Record
            RecordDTO record = new RecordDTO("app.bsky.feed.post", postagem.getDescricao(), OffsetDateTime.now().toString(), embed);

            // Criação do objeto RequestBody
            CreatePostRequestDTO requestBody = new CreatePostRequestDTO("app.bsky.feed.post", did, record);

            // Envio da requisição
            return sendCreatePostRequest(url, requestBody, accessJwt);
        } catch (Exception e) {
            log.error("Erro ao criar postagem no Bluesky: {}", e.getMessage());
            return false;
        }
    }

    private List<BlobResponseDTO> uploadMediaToBluesky(List<Anexo> anexos, String accessJwt) {
        List<BlobResponseDTO> blobResponses = new ArrayList<>();
        for (Anexo anexo : anexos) {
            blobResponses.add(uploadSingleMediaToBluesky(anexo, accessJwt));
        }
        return blobResponses;
    }

    private BlobResponseDTO uploadSingleMediaToBluesky(Anexo anexo, String accessJwt) {
        try {
            HttpEntity<byte[]> requestEntity = createUploadRequestEntity(anexo, accessJwt);

            ResponseEntity<BlobResponseDTO> response = restTemplate.exchange(
                    LINK_BLUESKY + "/com.atproto.repo.uploadBlob",
                    HttpMethod.POST,
                    requestEntity,
                    BlobResponseDTO.class
            );

            log.info("Resposta da API do Bluesky: {}", response.getBody());

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return response.getBody();
            } else {
                throw new RuntimeException("Falha no upload: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao fazer upload para o Bluesky: " + e.getMessage(), e);
        }
    }

    private HttpEntity<byte[]> createUploadRequestEntity(Anexo anexo, String accessJwt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(anexo.getMimeType()));
        headers.setBearerAuth(accessJwt);
        return new HttpEntity<>(anexo.getArquivo(), headers);
    }

    private EmbedDTO buildEmbed(List<BlobResponseDTO> blobResponses) {
        // Criando a lista de ImageEmbedDTO
        List<ImageEmbedDTO> imageEmbeds = new ArrayList<>();
        for (BlobResponseDTO blobResponse : blobResponses) {
            ImageEmbedDTO imageEmbed = new ImageEmbedDTO("brief alt text description", blobResponse.blob());
            imageEmbeds.add(imageEmbed);
        }

        // Criando o EmbedDTO com a lista de imagens
        return new EmbedDTO("app.bsky.embed.images", imageEmbeds);
    }

    private boolean sendCreatePostRequest(String url, CreatePostRequestDTO requestBody, String accessJwt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessJwt);

        HttpEntity<CreatePostRequestDTO> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            return handleCreatePostResponse(response);
        } catch (Exception e) {
            log.error("Erro ao enviar requisição de criação de postagem: {}", e.getMessage());
            return false;
        }
    }

    private boolean handleCreatePostResponse(ResponseEntity<String> response) {
        if (response.getStatusCode() == HttpStatus.OK) {
            log.info("Postagem criada com sucesso no Bluesky.");
            return true;
        } else {
            log.error("Falha ao criar postagem no Bluesky: {}", response.getBody());
            return false;
        }
    }


    public SessionInfoDTO refreshToken(Conta account) {
        try {
            String token = account.getToken();
            String refreshToken = Util.getValueByKey(token, "refreshToken");
            String url = LINK_BLUESKY + "/com.atproto.server.refreshSession";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(refreshToken);

            // Realizando a requisição POST sem corpo
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<SessionInfoDTO> response = restTemplate.exchange(url, HttpMethod.POST, entity, SessionInfoDTO.class);

            log.info("{}", response.getBody());

            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("Sessão refrescada com sucesso");

                ObjectMapper objectMapper = new ObjectMapper();

                String jsonString = objectMapper.writeValueAsString(response.getBody());

                account.setToken(jsonString);

                accountRepository.save(account);

                return response.getBody();
            } else {
                log.error("Falha ao refrescar a sessão. Status: {}", response.getStatusCode());
                return null;
            }

        } catch (Exception e) {
            log.error("Erro ao enviar requisição de criação de postagem: {}", e.getMessage());
            throw new RuntimeException();
        }
    }

    public InformationProfileDTO getProfile(Conta account) {
        SessionInfoDTO session = refreshToken(account);

        String did = session.did();
        String accessJwt = session.accessJwt();

        final String endpointUrl = LINK_BLUESKY + "/app.bsky.actor.getProfile?actor=" + did;

        // Configura os cabeçalhos da requisição
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessJwt);

        // Monta a entidade da requisição
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<InformationProfileDTO> response = restTemplate.exchange(
                    endpointUrl,
                    HttpMethod.GET,
                    entity,
                    InformationProfileDTO.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            }
        } catch (Exception e) {
            e.getMessage();
            throw new ResourceNotFoundException("Erro inesperado ao buscar o perfil no Bluesky");
        }
        return null;
    }

}
