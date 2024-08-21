package br.socialhub.api.dtos;

import br.socialhub.api.enums.DocumentType;
import br.socialhub.api.models.Usuario;

import java.time.LocalDate;

import static br.socialhub.api.utils.Constantes.LINK_URL_PHOTO;

public record UserResponseDTO(
        Long id,
        String name,
        String email,
        LocalDate birthDate,
        String documentNumber,
        DocumentType documentType,
        String url_photo
) {

    public UserResponseDTO(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getName(),
                usuario.getEmail(),
                usuario.getBirthDate(),
                usuario.getDocumentNumber(),
                usuario.getDocumentType(),
                String.format(LINK_URL_PHOTO, usuario.getId())
        );
    }
}
