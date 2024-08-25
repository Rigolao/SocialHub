package br.socialhub.api.dtos.role;

import br.socialhub.api.models.Cargo;

public record RoleResponseDTO(
        Long id,
        String name
) {
    public RoleResponseDTO(Cargo role){
        this(
                role.getId(),
                role.getDescription().getDescription()
        );
    }
}
