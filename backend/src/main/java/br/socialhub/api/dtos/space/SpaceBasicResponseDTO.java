package br.socialhub.api.dtos.space;

import br.socialhub.api.enums.RoleType;
import br.socialhub.api.models.UsuarioSpace;

public record SpaceBasicResponseDTO(Long id, String name, RoleType role) {
    public SpaceBasicResponseDTO(UsuarioSpace userSpace){
        this(
                userSpace.getSpace().getId(),
                userSpace.getSpace().getName(),
                userSpace.getRole().getDescription()
        );
    }
}
