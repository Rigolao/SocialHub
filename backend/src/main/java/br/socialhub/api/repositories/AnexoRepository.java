package br.socialhub.api.repositories;

import br.socialhub.api.models.Anexo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnexoRepository extends JpaRepository<Anexo, Long> {
}
