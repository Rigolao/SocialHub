package br.socialhub.api.repositories;

import br.socialhub.api.models.Cargo;
import br.socialhub.api.models.Space;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.models.UsuarioSpace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserSpaceRepository extends JpaRepository<UsuarioSpace, Long> {
    Optional<UsuarioSpace> findByUserAndSpaceAndRole(Usuario user, Space space, Cargo role);

    Optional<UsuarioSpace> findByUserAndSpace(Usuario user, Space space);
}
