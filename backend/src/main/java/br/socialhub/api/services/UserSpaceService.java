package br.socialhub.api.services;

import br.socialhub.api.models.Cargo;
import br.socialhub.api.models.Space;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.models.UsuarioSpace;
import br.socialhub.api.repositories.UserSpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserSpaceService {
    private final UserSpaceRepository userSpaceRepository;

    public void assignRoleToUserInSpace(final Usuario user, final Space space, final Cargo role){
        var userSpace = userSpaceRepository.save(new UsuarioSpace(user, space, role));
        space.setUserSpaces(List.of(userSpace));
    }

}
