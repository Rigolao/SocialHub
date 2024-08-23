package br.socialhub.api.repositories;

import br.socialhub.api.models.UsuarioSpace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSpaceRepository extends JpaRepository<UsuarioSpace, Long> {
}
