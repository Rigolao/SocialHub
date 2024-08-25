package br.socialhub.api.repositories;

import br.socialhub.api.models.PlanoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanoUsuarioRepository extends JpaRepository<PlanoUsuario, Long> {
}
