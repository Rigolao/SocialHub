package br.socialhub.api.dtos.space;

import br.socialhub.api.dtos.UsuarioSpaceResponseDTO;
import br.socialhub.api.models.Space;

import java.util.List;
import java.util.stream.Collectors;

public record SpaceResponseDTO(Long id, String name, List<UsuarioSpaceResponseDTO> members) {

    public SpaceResponseDTO(Space space) {
        this(
                space.getId(),
                space.getName(),
                space.getUserSpaces().stream()
                        .map(UsuarioSpaceResponseDTO::new)
                        .collect(Collectors.toList()));
    }
}
