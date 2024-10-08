package br.socialhub.api.services;

import br.socialhub.api.dtos.space.SpaceCreateDTO;
import br.socialhub.api.dtos.space.SpaceResponseDTO;
import br.socialhub.api.dtos.space.SpaceUpdateDTO;
import br.socialhub.api.dtos.user.MemberResponseDTO;
import br.socialhub.api.enums.RoleType;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.Space;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.models.UsuarioSpace;
import br.socialhub.api.repositories.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static br.socialhub.api.utils.Constantes.*;

@RequiredArgsConstructor
@Service
public class SpaceService {
    private final SpaceRepository spaceRepository;

    public Space createSpace(final SpaceCreateDTO spaceCreateDTO) {

        return spaceRepository.save(new Space(spaceCreateDTO.name()));
    }

    public SpaceResponseDTO updateSpace(final SpaceUpdateDTO spaceUpdateDTO, final Long id) {
        Space space = findById(id);
        space.setName(spaceUpdateDTO.name());
       return createResponse(spaceRepository.save(space));
    }

    public Space createSpaceDefault() {
        return spaceRepository.save(new Space(NAME_DEFAULT_SPACE));
    }

    private List<MemberResponseDTO> getMembers(final Space space) {
        return space.getUserSpaces().stream()
                .map(MemberResponseDTO::new)
                .collect(Collectors.toList());
    }

    public Space findById(final Long id) {
        return spaceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_SPACE));
    }

    public SpaceResponseDTO getSpaceById(final Long id) {
        Space space = findById(id);

        return new SpaceResponseDTO(space.getId(), space.getName(), getMembers(space));
    }

    public SpaceResponseDTO createResponse(final Space space) {
        return new SpaceResponseDTO(space, getMembers(space));
    }

    public Usuario getCreatorInSpace(final Space space){
        return space.getUserSpaces().stream()
                .filter(userSpace -> userSpace.getRole().getDescription().equals(RoleType.CREATOR))
                .map(UsuarioSpace::getUser)
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));
    }
}
