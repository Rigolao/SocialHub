package br.socialhub.api.repositories;

import br.socialhub.api.models.TokenInvite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenInviteRepository extends JpaRepository<TokenInvite, String> {
}
