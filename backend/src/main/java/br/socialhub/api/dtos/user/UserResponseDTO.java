package br.socialhub.api.dtos.user;

import br.socialhub.api.dtos.space.SpaceBasicResponseDTO;
import br.socialhub.api.enums.DocumentType;
import br.socialhub.api.models.Usuario;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.List;

import static br.socialhub.api.utils.Constantes.DATE_FORMAT_DD_MM_YYYY;
import static br.socialhub.api.utils.Constantes.LINK_URL_PHOTO;

public record UserResponseDTO(
        Long id,
        String name,
        String email,
        @JsonFormat(pattern = DATE_FORMAT_DD_MM_YYYY)
        LocalDate birthDate,
        String documentNumber,
        DocumentType documentType,
        String url_photo,
        List<SpaceBasicResponseDTO> spaces
) {

    public UserResponseDTO(Usuario usuario, List<SpaceBasicResponseDTO> spaces) {
        this(
                usuario.getId(),
                usuario.getName(),
                usuario.getEmail(),
                usuario.getBirthDate(),
                usuario.getDocumentNumber(),
                usuario.getDocumentType(),
                String.format(LINK_URL_PHOTO, usuario.getId()),
                spaces
        );
    }
}
