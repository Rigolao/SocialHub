package br.socialhub.api.repositories;

import br.socialhub.api.models.ContaPostagem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContaPostagemRepository extends JpaRepository<ContaPostagem, Long> {
}
