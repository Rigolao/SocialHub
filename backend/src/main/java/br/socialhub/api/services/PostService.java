package br.socialhub.api.services;

import br.socialhub.api.dtos.post.PostCreateDTO;
import br.socialhub.api.enums.PostStatus;
import br.socialhub.api.models.*;
import br.socialhub.api.repositories.ContaPostagemRepository;
import br.socialhub.api.repositories.PostRepository;
import br.socialhub.api.utils.Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {
    private final PostRepository postRepository;
    private final ContaPostagemRepository contaPostagemRepository;
    private final BlueSkyService blueSkyService;

    public Postagem createPost(UsuarioSpace userSpace, PostCreateDTO post) throws IOException {
        final Postagem postagem = _createNewPost(userSpace,post);

        return postRepository.save(postagem);
    }

    public void criarVinculoContaPostagem(Postagem postagem, Conta conta){
        final ContaPostagem contaPostagem = new ContaPostagem();
        contaPostagem.setPostagem(postagem);
        contaPostagem.setConta(conta);
        contaPostagem.setDataPostagem(LocalDateTime.now());

        contaPostagemRepository.save(contaPostagem);
    }

    private Postagem _createNewPost(UsuarioSpace usuarioSpace, PostCreateDTO post) throws IOException {
        final Postagem postagem = new Postagem();

        postagem.setUsuarioSpace(usuarioSpace);
        postagem.setTitulo(post.title());
        postagem.setDescricao(post.description());
        postagem.setDataAgendamento(post.scheduledDate());
        postagem.setStatus(PostStatus.AGENDADA);
        postagem.setAnexos(_createNewFiles(postagem, post.files()));

        return postagem;
    }

    private List<Anexo> _createNewFiles(Postagem postagem, List<MultipartFile> files) throws IOException {
        if(files != null && !files.isEmpty()){
            List<Anexo> anexos = new ArrayList<>();

            for (MultipartFile file : files) {
                final Anexo anexo = new Anexo();

                anexo.setArquivo(file.getBytes());
                anexo.setMimeType(file.getContentType());
                anexo.setNomeArquivo(file.getOriginalFilename());

                anexo.setPostagem(postagem);

                anexos.add(anexo);
            }

            return anexos;
        }

        return null;
    }


    @Transactional
    @Scheduled(fixedRate = 60000)
    public void buscarPorDataAgendamento() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = now.withSecond(0).withNano(0); // Início do minuto atual
        LocalDateTime end = start.plusMinutes(1).minusNanos(1); // Final do minuto atual

        List<Postagem> postagens = postRepository.findByStatusNotAgendadaOrAgendadaBetween(start, end);

        if (postagens.isEmpty()) {
            log.info("Nenhuma postagem agendada encontrada para o intervalo: {} - {}", start, end);
            return;
        }

        for (Postagem postagem : postagens) {
            for (ContaPostagem contaPostagem : postagem.getContaPostagens()) {
                String token = contaPostagem.getConta().getToken();
                String refreshJwt = Util.getValueByKey(token, "refreshJwt");

                try {
                    boolean isSuccess = blueSkyService.createPost(postagem, refreshJwt);

                    if (isSuccess) {
                        postagem.setStatus(PostStatus.POSTADA);
                        log.info("Postagem {} marcada como POSTADA.", postagem.getId());
                    } else {
                        postagem.setStatus(PostStatus.ERRO);
                        log.warn("Postagem {} marcada como ERRO.", postagem.getId());
                    }
                } catch (Exception e) {
                    postagem.setStatus(PostStatus.ERRO);
                    log.error("Erro ao processar postagem {}: {}", postagem.getId(), e.getMessage());
                }
            }
        }

        // Salva todas as postagens processadas em lote
        postRepository.saveAll(postagens);
        log.info("Processamento de postagens concluído.");
    }
}
