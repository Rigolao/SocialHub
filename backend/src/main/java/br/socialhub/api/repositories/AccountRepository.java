package br.socialhub.api.repositories;

import br.socialhub.api.enums.ActiveInactive;
import br.socialhub.api.models.Conta;
import br.socialhub.api.models.SocialNetwork;
import br.socialhub.api.models.Space;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Conta, Long> {
    Conta findBySpaceAndSocialNetworkAndStatus(Space space, SocialNetwork socialNetwork, ActiveInactive status);
}
