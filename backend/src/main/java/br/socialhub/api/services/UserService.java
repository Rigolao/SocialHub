package br.socialhub.api.services;

import br.socialhub.api.dtos.FotoResponseDTO;
import br.socialhub.api.dtos.UserCreateDTO;
import br.socialhub.api.dtos.UserResponseDTO;
import br.socialhub.api.enums.DocumentType;
import br.socialhub.api.enums.TokenStatus;
import br.socialhub.api.exceptions.DocumentoInvalidoException;
import br.socialhub.api.exceptions.MinimumAgeException;
import br.socialhub.api.exceptions.ResourceNotFoundException;
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
import java.util.Optional;

import static br.socialhub.api.utils.Constantes.LINK_RESET;
import static br.socialhub.api.utils.Constantes.RESOURCE_USER;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UsuarioRepository usuarioRepository;
    private final TokenAuditoriaRepository tokenAuditoriaRepository;
    private final PasswordEncoder passwordEncoder;
    private final FotoUtil fotoUtil;

    private static final String MIDIA_TYPE_SVG = "image/svg+xml";
    private static final int MINIMUM_AGE = 12;
    private static final long TOKEN_DURATION_IN_DAY = 1;

    public Usuario createUser(UserCreateDTO userDTO) {
        _validationCreateUser(userDTO);

        Usuario newUser = Usuario.builder()
                .name(userDTO.name())
                .email(userDTO.email())
                .password(passwordEncoder.encode(userDTO.password()))
                .birthDate(userDTO.birthDate())
                .documentType(userDTO.documentType())
                .documentNumber(userDTO.documentNumber())
                .build();

        return usuarioRepository.save(newUser);
    }

    public UserResponseDTO getUser(Long id) {
        return findById(id)
                .map(UserResponseDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));
    }

    private Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    public FotoResponseDTO getPhoto(Long id) {
        return findById(id)
                .map(Usuario::getUserPhoto)
                .map(FotoResponseDTO::new)
                .orElse(new FotoResponseDTO(fotoUtil.carregarFotoDefault(), MIDIA_TYPE_SVG));
    }

    public String uploadPhoto(Long id, MultipartFile file) throws IOException {
        var user = findById(id).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));

        var foto = FotoUsuario.builder()
                .nomeArquivo(file.getOriginalFilename())
                .mimeType(file.getContentType())
                .arquivo(file.getBytes())
                .usuario(user)
                .build();

        user.setUserPhoto(foto);
        usuarioRepository.save(user);

        return "Upload realizado com sucesso.";
    }

    private void _validationCreateUser(UserCreateDTO userDTO) {
        _validateMinimumAge(userDTO.birthDate());
        _validateDocument(userDTO.documentNumber(), userDTO.documentType());
    }
    private void _validateDocument(String documentNumber, DocumentType documentType) {

        switch (documentType) {
            case CNPJ:
                if (!CpfCnpjValidator.isCnpj(documentNumber)) {
                    throw new DocumentoInvalidoException(documentType.getDescricao());
                }
                break;
            case CPF:
                if (!CpfCnpjValidator.isCpf(documentNumber)) {
                    throw new DocumentoInvalidoException(documentType.getDescricao());
                }
                break;
            default:
                throw new IllegalArgumentException("Tipo de documento desconhecido: " + documentType);
        }
    }

    private void _validateMinimumAge(LocalDate birthDate){
        var age = Period.between(birthDate, LocalDate.now()).getYears();

        if(age < MINIMUM_AGE){
            throw new MinimumAgeException();
        }
    }

    public String generateResetLink(String email) {
        var user = usuarioRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));

        var tokenAuditoria = TokenAuditoria.builder()
                .usuario(user)
                .dataInicio(LocalDateTime.now())
                .dataFim(LocalDateTime.now().plusDays(TOKEN_DURATION_IN_DAY))
                .status(TokenStatus.UNUSED)
                .build();

        var uuid =  tokenAuditoriaRepository.save(tokenAuditoria).getToken();

        return String.format(LINK_RESET,uuid);
    }


    public void resetPassword(final Usuario user, final String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        usuarioRepository.save(user);
        System.out.println("Trocou a senha");
    }
}
