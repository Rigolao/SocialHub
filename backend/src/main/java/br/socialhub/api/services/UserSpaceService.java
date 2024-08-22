package br.socialhub.api.services;

import br.socialhub.api.models.Cargo;
import br.socialhub.api.models.Space;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.models.UsuarioSpace;
import br.socialhub.api.repositories.UsuarioSpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserSpaceService {

    private final UsuarioSpaceRepository usuarioSpaceRepository;
    public UsuarioSpace createUserSpace(final Space space, final Usuario user, final Cargo role) {
        var userSpace = UsuarioSpace.builder()
                .usuario(user)
                .space(space)
                .cargo(role)
                .build();

        usuarioSpaceRepository.save(userSpace);
    }
}
