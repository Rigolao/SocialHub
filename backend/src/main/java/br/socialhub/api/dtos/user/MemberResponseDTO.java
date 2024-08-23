package br.socialhub.api.dtos.user;

import br.socialhub.api.models.UsuarioSpace;

public record MemberResponseDTO(
        Long id,
        String name,
        String roleType
) {
    public MemberResponseDTO(UsuarioSpace userSpace){
        this(
                userSpace.getUser().getId(),
                userSpace.getUser().getName(),
                userSpace.getRole().getDescription().getDescription()
        );
    }
}
