package br.socialhub.api.services;

import br.socialhub.api.dtos.space.SpaceCreateDTO;
import br.socialhub.api.dtos.space.SpaceResponseDTO;
import br.socialhub.api.enums.RoleType;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.Cargo;
import br.socialhub.api.models.Space;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.models.UsuarioSpace;
import br.socialhub.api.repositories.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static br.socialhub.api.utils.Constantes.RESOURCE_SPACE;

@RequiredArgsConstructor
@Service
public class SpaceService {
    private final SpaceRepository spaceRepository;


    public Space createSpace(final SpaceCreateDTO spaceCreateDTO) {
        return Space.builder()
                .name(spaceCreateDTO.name())
                .build();
    }

    private Cargo _createCargo(final RoleType roleType) {
        return new Cargo(roleType);
    }

    private UsuarioSpace _createUsuarioSpace(final Space space, final Usuario user, final Cargo role) {
        return UsuarioSpace.builder()
                .space(space)
                .usuario(user)
                .cargo(role)
                .build();
    }

    private Space _createSpace(final String name) {
        return Space.builder()
                .name(name)
                .build();
    }

    public Space findById(final Long id){
        return spaceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_SPACE));
    }
    public SpaceResponseDTO getSpaceById(final Long id) {
        return new SpaceResponseDTO(findById(id));
    }
}
