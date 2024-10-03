package br.socialhub.api.repositories;

import br.socialhub.api.models.SocialNetwork;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SocialNetworkRepository extends JpaRepository<SocialNetwork, Long> {
}
