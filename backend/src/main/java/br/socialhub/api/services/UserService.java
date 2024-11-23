package br.socialhub.api.services;

import br.socialhub.api.dtos.reset_password.ResetPasswordDTO;
import br.socialhub.api.dtos.space.SpaceBasicResponseDTO;
import br.socialhub.api.dtos.user.*;
import br.socialhub.api.enums.ActiveInactive;
import br.socialhub.api.enums.DocumentType;
import br.socialhub.api.exceptions.*;
import br.socialhub.api.models.FotoUsuario;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.repositories.UsuarioRepository;
import br.socialhub.api.utils.CpfCnpjValidator;
import br.socialhub.api.utils.PhotoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static br.socialhub.api.utils.Constantes.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final PhotoUtil photoUtil;

    private static final String MIDIA_TYPE_SVG = "image/svg+xml";
    private static final int MINIMUM_AGE = 12;


    public Usuario createUser(final UserCreateDTO userDTO) {
        _validationCreateUser(userDTO);

        return usuarioRepository.save(_createNewUser(userDTO));
    }

    public UserResponseDTO getUser(final Long id) {
        return findByIdOptional(id)
                .map(user -> new UserResponseDTO(user, getSpaces(user)))
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));
    }

    private List<SpaceBasicResponseDTO> getSpaces(final Usuario usuario) {
        return usuario.getUsuarioSpaces().stream()
                .filter(usuarioSpace -> usuarioSpace.getSpace().getStatus() == ActiveInactive.ACTIVE)
                .map(SpaceBasicResponseDTO::new)
                .collect(Collectors.toList());
    }


    private Optional<Usuario> findByIdOptional(final Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario findById(final Long id) {
        return usuarioRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));
    }

    public Usuario findByEmail(final String email) {
        return usuarioRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));
    }

    public PhotoResponseDTO getPhoto(final Long id) {
        return findByIdOptional(id)
                .map(Usuario::getUserPhoto)
                .map(PhotoResponseDTO::new)
                .orElse(new PhotoResponseDTO(photoUtil.carregarFotoDefault(), MIDIA_TYPE_SVG));
    }

    public void uploadPhoto(final Long id, final MultipartFile file) throws IOException {
        var user = findById(id);
        final FotoUsuario photo = user.getUserPhoto() != null ? user.getUserPhoto() : new FotoUsuario();

        if (photo.getUser() == null) {
            photo.setUser(user);
        }

        photo.setArquivo(file.getBytes());
        photo.setMimeType(file.getContentType());
        photo.setNomeArquivo(file.getOriginalFilename());

        user.setUserPhoto(photo);
        usuarioRepository.save(user);
    }

    private void _validationCreateUser(final UserCreateDTO userDTO) {
        _validateMinimumAge(userDTO.birthDate());
        _validateDocument(userDTO.documentNumber(), userDTO.documentType());
        _validateConfirmPassword(userDTO.password(), userDTO.confirmPassword());
        _validateDocumentNumberUnique(userDTO.documentNumber());
        _validateEmailUnique(userDTO.email());
    }

    private void _validationUpdateUser(final UserUpdateDTO userDTO){
        _validateMinimumAge(userDTO.birthDate());
    }

    public void resetPassword(final Usuario user, final ResetPasswordDTO resetPasswordDTO) {
        _validateConfirmPassword(resetPasswordDTO.newPassword(), resetPasswordDTO.confirmPassword());
        user.setPassword(passwordEncoder.encode(resetPasswordDTO.newPassword()));
        usuarioRepository.save(user);
    }

    public UserResponseDTO updateUser(final Long id, UserUpdateDTO userUpdateDTO) {
        _validationUpdateUser(userUpdateDTO);

        var user = findById(id);

        user.setName(userUpdateDTO.name());
        user.setBirthDate(userUpdateDTO.birthDate());

        return new UserResponseDTO(usuarioRepository.save(user), getSpaces(user));
    }

    public void updatePasswordUser(Long id, UserUpdatePasswordDTO userUpdatePasswordDTO) {
        _validateConfirmPassword(userUpdatePasswordDTO.newPassword(), userUpdatePasswordDTO.confirmPassword());

        var user = findById(id);

        _validateOldPassword(userUpdatePasswordDTO.currentPassword(), user.getPassword());

        String newPasswordEncode = passwordEncoder.encode(userUpdatePasswordDTO.newPassword());
        user.setPassword(newPasswordEncode);

        usuarioRepository.save(user);
    }

    private void _validateConfirmPassword(final String password, final String confirmPassword) {
        if (!Objects.equals(password, confirmPassword)) {
            throw new PasswordMismatchException(EXCEPTION_PASSWORD_MISMATCH);
        }
    }

    private void _validateOldPassword(final String oldPassword, final String storedPassword) {
        if (!passwordEncoder.matches(oldPassword, storedPassword)) {
            throw new PasswordMismatchException(EXCEPTION_PASSWORD_MISMATCH_OLD_PASSWORD);
        }
    }

    private void _validateDocumentNumberUnique(final String documentNumber){
        var user = usuarioRepository.findByDocumentNumber(documentNumber);
        if(user.isPresent()){
            throw new DocumentNumberNotUniqueException();
        }
    }

    private void _validateEmailUnique(final String email){
        var user = usuarioRepository.findByEmail(email);
        if(user.isPresent()){
            throw new EmailNotUniqueException();
        }
    }

    private void _validateDocument(final String documentNumber, final DocumentType documentType) {

        switch (documentType) {
            case CNPJ:
                if (!CpfCnpjValidator.isCnpj(documentNumber)) {
                    throw new InvalidDocumentException(documentType.getDescription());
                }
                break;
            case CPF:
                if (!CpfCnpjValidator.isCpf(documentNumber)) {
                    throw new InvalidDocumentException(documentType.getDescription());
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
            throw new UnauthorizedAccessException(EXCEPTION_UNAUTHORIZED_RESOURCE);
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

    public UserResponseDTO convertUserForUserResponseDTO(final Usuario user){
        return new UserResponseDTO(user, getSpaces(user));
    }

    public List<UserBasicResponseDTO> searchUserByEmail(String filter) {
        if(filter == null || filter.isBlank()){
            return Collections.emptyList();
        }

       Optional<List<Usuario>> result = usuarioRepository.findByEmailStartingWithIgnoreCase(filter);

       return result
               .map(users -> users.stream()
                       .map(UserBasicResponseDTO::new)
                       .collect(Collectors.toList()))
               .orElseGet(Collections::emptyList);

    }

    public boolean isUserSelf(String email, Long idUser){
        return findByEmail(email).equals(findById(idUser));

    }

}
