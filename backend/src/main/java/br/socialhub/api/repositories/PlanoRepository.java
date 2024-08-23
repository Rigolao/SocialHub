package br.socialhub.api.repositories;

import br.socialhub.api.models.Plano;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanoRepository extends JpaRepository<Plano, Long> {
}
