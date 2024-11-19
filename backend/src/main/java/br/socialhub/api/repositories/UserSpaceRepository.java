package br.socialhub.api.repositories;

import br.socialhub.api.models.Cargo;
import br.socialhub.api.models.Space;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.models.UsuarioSpace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSpaceRepository extends JpaRepository<UsuarioSpace, Long> {
    Optional<UsuarioSpace> findByUserAndSpaceAndRole(Usuario user, Space space, Cargo role);

    Optional<UsuarioSpace> findByUserAndSpaceAndRoleIn(Usuario user, Space space, List<Cargo> roles);

    Optional<UsuarioSpace> findByUserAndSpace(Usuario user, Space space);
}
