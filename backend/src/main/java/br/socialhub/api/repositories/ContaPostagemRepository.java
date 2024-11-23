package br.socialhub.api.repositories;

import br.socialhub.api.models.Conta;
import br.socialhub.api.models.ContaPostagem;
import br.socialhub.api.models.Postagem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContaPostagemRepository extends JpaRepository<ContaPostagem, Long> {
    Optional<ContaPostagem> findByPostagemAndConta(Postagem postagem, Conta conta);
}
