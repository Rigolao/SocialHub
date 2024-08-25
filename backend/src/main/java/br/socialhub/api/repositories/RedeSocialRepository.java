package br.socialhub.api.repositories;

import br.socialhub.api.models.RedeSocial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RedeSocialRepository extends JpaRepository<RedeSocial, Long> {
}
