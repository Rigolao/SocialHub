package br.socialhub.api.services;

import br.socialhub.api.dtos.*;
import br.socialhub.api.enums.DocumentType;
import br.socialhub.api.enums.TokenStatus;
import br.socialhub.api.exceptions.*;
import br.socialhub.api.models.*;
import br.socialhub.api.repositories.TokenAuditoriaRepository;
import br.socialhub.api.repositories.UsuarioRepository;
import br.socialhub.api.utils.CpfCnpjValidator;
import br.socialhub.api.utils.PhotoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static br.socialhub.api.utils.Constantes.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UsuarioRepository usuarioRepository;
    private final TokenAuditoriaRepository tokenAuditoriaRepository;
    private final PasswordEncoder passwordEncoder;
    private final PhotoUtil photoUtil;

    private static final String MIDIA_TYPE_SVG = "image/svg+xml";
    private static final int MINIMUM_AGE = 12;
    private static final long TOKEN_DURATION_IN_DAY = 1;

    public UserResponseDTO createUser(final UserCreateDTO userDTO) {
        _validationCreateUser(userDTO);

        Usuario newUser = _createNewUser(userDTO);
        TipoParticipante tipoParticipante = _createDefaultTipoParticipante();
        Participante participante = _createDefaultParticipante(newUser, tipoParticipante);
        Space space = _createDefaultSpace();

        _createParticipanteSpaceAssociation(participante, space);

        newUser.setParticipantes(List.of(participante));

        return new UserResponseDTO(usuarioRepository.save(newUser));
    }

    private void _createParticipanteSpaceAssociation(Participante participante, Space space) {
        ParticipanteSpace participanteSpace = ParticipanteSpace.builder()
                .participante(participante)
                .space(space)
                .build();

        participante.setParticipanteSpaces(List.of(participanteSpace));
        space.setParticipanteSpaces(List.of(participanteSpace));
    }

    private Space _createDefaultSpace() {
        return Space.builder()
                .nome(NAME_DEFAULT_SPACE)
                .build();
    }

    private TipoParticipante _createDefaultTipoParticipante() {
        return new TipoParticipante(TYPE_DEFAULT_PARTICIPANT);
    }


    public UserResponseDTO getUser(final Long id) {
        return findById(id)
                .map(UserResponseDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));
    }

    private Optional<Usuario> findById(final Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario findByEmail(final String email) {
        return usuarioRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));
    }

    public PhotoResponseDTO getPhoto(final Long id) {
        return findById(id)
                .map(Usuario::getUserPhoto)
                .map(PhotoResponseDTO::new)
                .orElse(new PhotoResponseDTO(photoUtil.carregarFotoDefault(), MIDIA_TYPE_SVG));
    }

    public void uploadPhoto(final Long id, final MultipartFile file) throws IOException {
        var user = findById(id).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));

        var foto = FotoUsuario.builder()
                .nomeArquivo(file.getOriginalFilename())
                .mimeType(file.getContentType())
                .arquivo(file.getBytes())
                .usuario(user)
                .build();

        user.setUserPhoto(foto);
        usuarioRepository.save(user);
    }

    private void _validationCreateUser(final UserCreateDTO userDTO) {
        _validateMinimumAge(userDTO.birthDate());
        _validateDocument(userDTO.documentNumber(), userDTO.documentType());
    }


    public String generateResetLink(final String email) {
        var user = findByEmail(email);

        var tokenAuditoria = TokenAuditoria.builder()
                .usuario(user)
                .dataInicio(LocalDateTime.now())
                .dataFim(LocalDateTime.now().plusDays(TOKEN_DURATION_IN_DAY))
                .status(TokenStatus.UNUSED)
                .build();

        var uuid = tokenAuditoriaRepository.save(tokenAuditoria).getToken();

        return String.format(LINK_RESET, uuid);
    }

    public void resetPassword(final Usuario user, final String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        usuarioRepository.save(user);
        System.out.println("Trocou a senha");
    }

    public UserResponseDTO updateUser(final String email, UserUpdateDTO userUpdateDTO) {
        _validateMinimumAge(userUpdateDTO.birthDate());

        var user = findByEmail(email);

        user.setName(userUpdateDTO.name());
        user.setBirthDate(userUpdateDTO.birthDate());

        return new UserResponseDTO(usuarioRepository.save(user));
    }

    public String updatePasswordUser(String email, UserUpdatePasswordDTO userUpdatePasswordDTO) {
        _validateConfirmPassword(userUpdatePasswordDTO.newPassword(), userUpdatePasswordDTO.confirmPassword());

        var user = findByEmail(email);

        _validateOldPassword(userUpdatePasswordDTO.oldPassword(), user.getPassword());

        String newPasswordEncode = passwordEncoder.encode(userUpdatePasswordDTO.newPassword());
        user.setPassword(newPasswordEncode);

        usuarioRepository.save(user);

        return "Sucesso";
    }

    private void _validateConfirmPassword(final String password, final String confirmPassword) {
        if (!Objects.equals(password, confirmPassword)) {
            throw new PasswordMismatchException();
        }
    }

    private void _validateOldPassword(final String oldPassword, final String storedPassword) {
        if (!passwordEncoder.matches(oldPassword, storedPassword)) {
            throw new PasswordMismatchException();
        }
    }

    private void _validateDocument(final String documentNumber, final DocumentType documentType) {

        switch (documentType) {
            case CNPJ:
                if (!CpfCnpjValidator.isCnpj(documentNumber)) {
                    throw new InvalidDocumentException(documentType.getDescricao());
                }
                break;
            case CPF:
                if (!CpfCnpjValidator.isCpf(documentNumber)) {
                    throw new InvalidDocumentException(documentType.getDescricao());
                }
                break;
            default:
                throw new IllegalArgumentException("Tipo de documento desconhecido: " + documentType);
        }
    }

    private void _validateMinimumAge(final LocalDate birthDate) {
        var age = Period.between(birthDate, LocalDate.now()).getYears();

        if (age < MINIMUM_AGE) {
            throw new MinimumAgeException();
        }
    }


    public void validateUser(final String email, final Long id) {
        var user = findByEmail(email);

        if (!Objects.equals(user.getId(), id)) {
            throw new UnauthorizedAccessException(EXCEPTION_UNAUTHORIZED);
        }

    }

    private Usuario _createNewUser(final UserCreateDTO userDTO) {
        return Usuario.builder()
                .name(userDTO.name())
                .email(userDTO.email())
                .password(passwordEncoder.encode(userDTO.password()))
                .birthDate(userDTO.birthDate())
                .documentType(userDTO.documentType())
                .documentNumber(userDTO.documentNumber())
                .build();
    }

    private Participante _createDefaultParticipante(Usuario newUser, TipoParticipante tipoParticipante) {
        return Participante.builder()
                .usuario(newUser)
                .tipoParticipante(tipoParticipante)
                .build();
    }
}
