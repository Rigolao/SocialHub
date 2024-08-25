package br.socialhub.api.services;

import br.socialhub.api.enums.RoleType;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.exceptions.RestrictedRoleException;
import br.socialhub.api.exceptions.UserAlreadyAssignedToSpaceException;
import br.socialhub.api.models.Cargo;
import br.socialhub.api.models.Space;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.models.UsuarioSpace;
import br.socialhub.api.repositories.CargoRepository;
import br.socialhub.api.repositories.SpaceRepository;
import br.socialhub.api.repositories.UserSpaceRepository;
import br.socialhub.api.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static br.socialhub.api.utils.Constantes.RESOURCE_SPACE;
import static br.socialhub.api.utils.Constantes.RESOURCE_USER;

@RequiredArgsConstructor
@Service
public class UserSpaceService {
    private final UserSpaceRepository userSpaceRepository;
    private final UsuarioRepository usuarioRepository;
    private final SpaceRepository spaceRepository;
    private final CargoRepository cargoRepository;

    public void assignRoleToUserInSpace(final Usuario user, final Space space, final Cargo role) {
        _validateAssignRoleToUserInSpace(user, space);
        var userSpace = userSpaceRepository.save(new UsuarioSpace(user, space, role));
        space.setUserSpaces(List.of(userSpace));
    }

    public void updateRoleInSpace(final Usuario user, final Space space, final Cargo role) {
        _validateRoleCreator(role);

        var userSpace = findByUserAndSpace(user, space);

        userSpace.setRole(role);
        userSpaceRepository.save(userSpace);
    }

    public void removeUserFromSpace(final Usuario user, final Space space) {
        var userSpace = findByUserAndSpace(user,space);

        userSpaceRepository.delete(userSpace);
    }

    private UsuarioSpace findByUserAndSpace(final Usuario user, final Space space) {
        return userSpaceRepository.findByUserAndSpace(user, space)
                .orElseThrow(UserAlreadyAssignedToSpaceException::new);
    }

    private void _validateAssignRoleToUserInSpace(Usuario user, Space space) {
        Optional<UsuarioSpace> userSpace = userSpaceRepository.findByUserAndSpace(user, space);
        if (userSpace.isPresent()) {
            throw new UserAlreadyAssignedToSpaceException();
        }
    }

    private void _validateRoleCreator(final Cargo role) {
        if (role.getDescription().equals(RoleType.CREATOR)) {
            throw new RestrictedRoleException();
        }
    }

    public boolean userIsCreatorInSpace(final Usuario user, final Space space, final Cargo role) {

        var userSpace = userSpaceRepository.findByUserAndSpaceAndRole(user, space, role);

        return userSpace.isPresent();
    }

    public boolean userIsCreatorInSpace(final String email, final Long idSpace) {
        var user = usuarioRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));
        var space = spaceRepository.findById(idSpace).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_SPACE));
        var cargo = cargoRepository.findByDescription(RoleType.CREATOR);


        return userIsCreatorInSpace(user, space, cargo);
    }
}
