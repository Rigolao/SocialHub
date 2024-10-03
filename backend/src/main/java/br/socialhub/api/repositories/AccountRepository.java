package br.socialhub.api.repositories;

import br.socialhub.api.models.Conta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Conta, Long> {
}
