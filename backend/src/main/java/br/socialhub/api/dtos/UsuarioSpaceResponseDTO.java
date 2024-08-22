package br.socialhub.api.dtos;

import br.socialhub.api.models.UsuarioSpace;

public record UsuarioSpaceResponseDTO(Long id, String memberName, String role) {

    public UsuarioSpaceResponseDTO(UsuarioSpace usuarioSpace){
        this(
                usuarioSpace.getId(),
                usuarioSpace.getUsuario().getName(),
                usuarioSpace.getCargo().getDescription().getDescription()
        );
    }
}
