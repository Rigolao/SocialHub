package br.socialhub.api.dtos.user;

import br.socialhub.api.models.Usuario;

import static br.socialhub.api.utils.Constantes.LINK_URL_PHOTO;

public record UserBasicResponseDTO(
        Long id,
        String email,
        String url_photo
) {
    public UserBasicResponseDTO(Usuario usuario){
        this(usuario.getId(), usuario.getEmail(), String.format(LINK_URL_PHOTO, usuario.getId()));
    }

}
