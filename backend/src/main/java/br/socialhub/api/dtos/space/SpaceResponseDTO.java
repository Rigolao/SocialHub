package br.socialhub.api.dtos.space;

import br.socialhub.api.dtos.user.MemberResponseDTO;
import br.socialhub.api.models.Space;

import java.util.List;

public record SpaceResponseDTO(Long id, String name, List<MemberResponseDTO> members) {
    public SpaceResponseDTO(Space space, List<MemberResponseDTO> members){
        this(
                space.getId(),
                space.getName(),
                members
        );
    }
}
