package br.socialhub.api.services;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;

import static br.socialhub.api.utils.Constantes.LINK_BLUESKY;

@Service
@RequiredArgsConstructor
@Slf4j
@Getter
public class BlueSkyService {
    private static final String USERNAME = "socialhuboficial.bsky.social";
    private static final String PASSWORD = "s0ci@lhub1.";

    private String accessJwt;
    private String did;

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
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                this.accessJwt = (String) response.getBody().get("accessJwt");
                this.did = (String) response.getBody().get("did");
                log.info("Autenticado com sucesso no Bluesky API.");
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

    /**
     * Publica uma postagem no Bluesky.
     *
     * @param content Conteúdo da postagem.
     * @return true se a postagem for publicada com sucesso, false caso contrário.
     */
    public boolean createPost(String content) {
        String url = LINK_BLUESKY + "/com.atproto.repo.createRecord";

        Map<String, Object> record = new HashMap<>();
        record.put("text", content);
        record.put("createdAt", OffsetDateTime.now().toString());

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("collection", "app.bsky.feed.post");
        requestBody.put("repo", did);
        requestBody.put("record", record);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessJwt);

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
}
