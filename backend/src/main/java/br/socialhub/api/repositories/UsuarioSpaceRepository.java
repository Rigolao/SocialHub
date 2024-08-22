package br.socialhub.api.repositories;

import br.socialhub.api.models.UsuarioSpace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioSpaceRepository extends JpaRepository<UsuarioSpace, Long> {
}
