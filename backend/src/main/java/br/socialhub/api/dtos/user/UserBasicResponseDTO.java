package br.socialhub.api.dtos.user;

import br.socialhub.api.models.Usuario;

public record UserBasicResponseDTO(
        Long id,
        String email,
        String url_photo
) {
    public UserBasicResponseDTO(Usuario usuario){
        this(usuario.getId(), usuario.getEmail(), "teste");
    }

}
