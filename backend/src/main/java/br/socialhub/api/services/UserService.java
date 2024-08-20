package br.socialhub.api.services;

import br.socialhub.api.dtos.FotoResponseDTO;
import br.socialhub.api.dtos.UserCreateDTO;
import br.socialhub.api.dtos.UserResponseDTO;
import br.socialhub.api.enums.TipoDeDocumento;
import br.socialhub.api.enums.TokenStatus;
import br.socialhub.api.exceptions.DocumentoInvalidoException;
import br.socialhub.api.exceptions.IdadeMinimaException;
import br.socialhub.api.exceptions.RecursoNaoEncontradoException;
import br.socialhub.api.models.FotoUsuario;
import br.socialhub.api.models.TokenAuditoria;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.repositories.TokenAuditoriaRepository;
import br.socialhub.api.repositories.UsuarioRepository;
import br.socialhub.api.utils.CpfCnpjValidator;
import br.socialhub.api.utils.FotoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UsuarioRepository usuarioRepository;
    private final TokenAuditoriaRepository tokenAuditoriaRepository;
    private final PasswordEncoder passwordEncoder;
    private final FotoUtil fotoUtil;

    private static final String MIDIA_TYPE_SVG = "image/svg+xml";
    private static final int IDADE_MINIMA = 12;
    private static final long DIA_DURACAO_TOKEN = 1;

    public Usuario createUser(UserCreateDTO userDTO) {
        _validarCreateUser(userDTO);

        Usuario newUser = Usuario.builder()
                .nome(userDTO.nome())
                .email(userDTO.email())
                .senha(passwordEncoder.encode(userDTO.senha()))
                .dataNascimento(userDTO.dataNascimento())
                .tipoDocumento(userDTO.tipoDeDocumento())
                .numeroDocumento(userDTO.numeroDocumento())
                .build();

        return usuarioRepository.save(newUser);
    }

    public UserResponseDTO getUser(Long id) {
        return findById(id)
                .map(UserResponseDTO::new)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado."));
    }

    private Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    public FotoResponseDTO getFoto(Long id) {
        return findById(id)
                .map(Usuario::getFotoUsuario)
                .map(FotoResponseDTO::new)
                .orElse(new FotoResponseDTO(fotoUtil.carregarFotoDefault(), MIDIA_TYPE_SVG));
    }

    public String uploadFoto(Long id, MultipartFile file) throws IOException {
        var user = findById(id).orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado."));

        var foto = FotoUsuario.builder()
                .nomeArquivo(file.getOriginalFilename())
                .mimeType(file.getContentType())
                .arquivo(file.getBytes())
                .usuario(user)
                .build();

        user.setFotoUsuario(foto);
        usuarioRepository.save(user);

        return "Upload realizado com sucesso.";
    }

    private void _validarCreateUser(UserCreateDTO userDTO) {
        _validarIdadeMinima(userDTO.dataNascimento());
        _validarDocumento(userDTO.numeroDocumento(), userDTO.tipoDeDocumento());
    }
    private void _validarDocumento(String documento, TipoDeDocumento tipoDeDocumento) {
        String mensagem = String.format("O %s é inválido", tipoDeDocumento.getDescricao());

        switch (tipoDeDocumento) {
            case CNPJ:
                if (!CpfCnpjValidator.isCnpj(documento)) {
                    throw new DocumentoInvalidoException(mensagem);
                }
                break;
            case CPF:
                if (!CpfCnpjValidator.isCpf(documento)) {
                    throw new DocumentoInvalidoException(mensagem);
                }
                break;
            default:
                throw new IllegalArgumentException("Tipo de documento desconhecido: " + tipoDeDocumento);
        }
    }

    private void _validarIdadeMinima(LocalDate dataNascimento){
        var idade = Period.between(dataNascimento, LocalDate.now()).getYears();

        if(idade < IDADE_MINIMA){
            throw new IdadeMinimaException("Idade mínima inválida: a idade permitida é a partir de 12 anos.");
        }
    }

    public String gerarResetLink (String email) {
        var user = usuarioRepository
                .findByEmail(email)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Email"));

        var tokenAuditoria = TokenAuditoria.builder()
                .usuario(user)
                .dataInicio(LocalDateTime.now())
                .dataFim(LocalDateTime.now().plusDays(DIA_DURACAO_TOKEN))
                .status(TokenStatus.UNUSED)
                .build();

        var uuid =  tokenAuditoriaRepository.save(tokenAuditoria).getToken();

        return String.format("localhost:8080/password/reset?token=%s",uuid);
    }


    public void resetPassword(final Usuario user, final String newPassword) {
        user.setSenha(passwordEncoder.encode(newPassword));
        usuarioRepository.save(user);
        System.out.println("Trocou a senha");
    }
}
