package br.socialhub.api.services;

import br.socialhub.api.dtos.post.PostCreateDTO;
import br.socialhub.api.dtos.post.PostDTO;
import br.socialhub.api.dtos.post.PostResponseDTO;
import br.socialhub.api.dtos.post.PostUpdateDTO;
import br.socialhub.api.dtos.space.SpaceResponseDTO;
import br.socialhub.api.enums.PostStatus;
import br.socialhub.api.exceptions.PostDateSchedulingException;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.*;
import br.socialhub.api.repositories.AnexoRepository;
import br.socialhub.api.repositories.ContaPostagemRepository;
import br.socialhub.api.repositories.PostRepository;
import br.socialhub.api.repositories.SocialNetworkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static br.socialhub.api.utils.Constantes.RESOURCE_POST;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {
    private static final String SCHEDULE_DATE_ERROR = "A data e hora do agendamento devem ser, no mínimo, 5 minutos à frente da data e hora atual.";
    private static final int MINIMUM_SCHEDULE_MINUTES = 5;

    private final PostRepository postRepository;
    private final ContaPostagemRepository contaPostagemRepository;
    private final BlueSkyService blueSkyService;
    private final AnexoRepository anexoRepository;

    @Transactional
    public PostResponseDTO createPost(PostCreateDTO post, UsuarioSpace userSpace, List<Conta> accounts) throws IOException {
        _validateScheduleDate(post.scheduledDate());
        Postagem postagem = createNewPost(userSpace, post);
        _createNewContaPostagem(postagem, post, accounts);
        return new PostResponseDTO(postRepository.save(postagem));
    }

    public PostResponseDTO updatePost(Long id, PostUpdateDTO post, UsuarioSpace userSpace, List<Conta> accounts) throws IOException {
        _validateScheduleDate(post.scheduledDate());
        Postagem postagem = findById(id);
        _updatePostDetails(postagem, post, userSpace);
        _updateContaPostagem(postagem, post, accounts);

        return new PostResponseDTO(postRepository.save(postagem));
    }

    private void _updateContaPostagem(Postagem postagem, PostUpdateDTO post, List<Conta> accounts) {
        List<ContaPostagem> contaPostagensBanco = postagem.getContaPostagens();
        List<ContaPostagem> contaPostagensAtuais = new ArrayList<>();

        for (Long idSocialNetwork : post.idSocialNetworks()) {
            Conta account = _findAccountBySocialNetworkId(accounts, idSocialNetwork);
            ContaPostagem contaPostagem = _findOrCreateContaPostagem(postagem, account);

            contaPostagensAtuais.add(contaPostagem);
        }

        contaPostagensBanco.stream()
                .filter(contaPostagem -> !contaPostagensAtuais.contains(contaPostagem))
                .forEach(this::_removeContaPostagem);

        postagem.setContaPostagens(contaPostagensAtuais);
    }


    private void _validateScheduleDate(LocalDateTime scheduleDate) {
        LocalDateTime now = LocalDateTime.now();
        if (scheduleDate.isBefore(now) || scheduleDate.isBefore(now.plusMinutes(MINIMUM_SCHEDULE_MINUTES))) {
            throw new PostDateSchedulingException(SCHEDULE_DATE_ERROR);
        }
    }

    private void _validateScheduleDate() {
        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(now.plusMinutes(MINIMUM_SCHEDULE_MINUTES))) {
            throw new PostDateSchedulingException(SCHEDULE_DATE_ERROR);
        }
    }

    private Postagem createNewPost(UsuarioSpace userSpace, PostCreateDTO post) throws IOException {
        Postagem postagem = new Postagem();
        postagem.setUsuarioSpace(userSpace);
        postagem.setTitulo(post.title());
        postagem.setDescricao(post.description());
        postagem.setDataAgendamento(post.scheduledDate());
        postagem.setStatus(PostStatus.AGENDADA);
        _processAttachments(postagem, post.files());
        return postagem;
    }

    private void _updatePostDetails(Postagem postagem, PostUpdateDTO post, UsuarioSpace userSpace) throws IOException {
        postagem.setTitulo(post.title());
        postagem.setDescricao(post.description());
        postagem.setDataAgendamento(post.scheduledDate());
        postagem.setStatus(PostStatus.AGENDADA);
        postagem.setUsuarioSpace(userSpace);

        _updateAttachments(postagem, post);
    }

    private void _processAttachments(Postagem postagem, List<MultipartFile> files) throws IOException {
        if (files == null || files.isEmpty()) {
            return;
        }

        List<Anexo> anexos = new ArrayList<>();
        for (MultipartFile file : files) {
            Anexo anexo = new Anexo();
            anexo.setArquivo(file.getBytes());
            anexo.setMimeType(file.getContentType());
            anexo.setNomeArquivo(file.getOriginalFilename());
            anexo.setPostagem(postagem);
            anexos.add(anexo);
        }

        postagem.setAnexos(anexos);
    }

    private void _updateAttachments(Postagem postagem, PostUpdateDTO postDTO) throws IOException {
        List<Long> existingIds = postDTO.existingAttachmentIds();

        List<Anexo> anexosAtuais = postagem.getAnexos();
        if (existingIds != null) {
            List<Anexo> anexosParaRemover = anexosAtuais.stream()
                    .filter(anexo -> !existingIds.contains(anexo.getId()))
                    .toList();
            anexoRepository.deleteAll(anexosParaRemover);

            postagem.getAnexos().removeAll(anexosParaRemover);
        }

        _processAttachments(postagem, postDTO.files());
    }

    @Transactional
    @Scheduled(fixedRate = 60000)
    public void processScheduledPosts() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = now.withSecond(0).withNano(0);
        LocalDateTime end = start.plusMinutes(1).minusNanos(1);

        List<Postagem> scheduledPosts = postRepository.findByStatusNotAgendadaOrAgendadaBetween(start, end);
        if (scheduledPosts.isEmpty()) {
            log.info("Nenhuma postagem agendada encontrada para o intervalo: {} - {}", start, end);
            return;
        }

        scheduledPosts.forEach(this::processPost);
        postRepository.saveAll(scheduledPosts);
        log.info("Processamento de postagens concluído para o intervalo: {} - {}", start, end);
    }

    private void processPost(Postagem postagem) {
        try {
            boolean isSuccess = blueSkyService.createPost(postagem);
            postagem.setStatus(isSuccess ? PostStatus.POSTADA : PostStatus.ERRO);
            log.info("Postagem {} marcada como {}.", postagem.getId(), isSuccess ? "POSTADA" : "ERRO");
        } catch (Exception e) {
            postagem.setStatus(PostStatus.ERRO);
            log.error("Erro ao processar postagem {}: {}", postagem.getId(), e.getMessage(), e);
        }
    }

    public Postagem findById(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_POST));
    }

    private ContaPostagem _findOrCreateContaPostagem(Postagem postagem, Conta account) {
        return contaPostagemRepository.findByPostagemAndConta(postagem, account)
                .orElseGet(() -> _createNewContaPostagem(postagem, account));
    }

    private ContaPostagem _createNewContaPostagem(Postagem postagem, Conta account) {
        ContaPostagem contaPostagem = new ContaPostagem();
        contaPostagem.setPostagem(postagem);
        contaPostagem.setDataPostagem(LocalDateTime.now());
        contaPostagem.setConta(account);
        return contaPostagem;
    }

    private void _createNewContaPostagem(Postagem postagem, PostCreateDTO post, List<Conta> accounts) {
        List<ContaPostagem> contaPostagens = new ArrayList<>();

        for (Long idSocialNetwork : post.idSocialNetworks()) {
            Conta account = _findAccountBySocialNetworkId(accounts, idSocialNetwork);
            contaPostagens.add(_createNewContaPostagem(postagem, account));
        }

        postagem.setContaPostagens(contaPostagens);
    }

    private Conta _findAccountBySocialNetworkId(List<Conta> accounts, Long idSocialNetwork) {
        return accounts.stream()
                .filter(conta -> conta.getSocialNetwork().getId().equals(idSocialNetwork))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Conta com o ID da rede social " + idSocialNetwork));
    }

    private void _removeContaPostagem(ContaPostagem contaPostagem) {
        contaPostagemRepository.delete(contaPostagem);
    }

    public void deletePost(Long id) {
        Postagem postagem = findById(id);

        postRepository.delete(postagem);
    }

    public PostResponseDTO getPostById(Long id) {
        Postagem postagem = findById(id);
        return new PostResponseDTO(postagem);
    }
}
