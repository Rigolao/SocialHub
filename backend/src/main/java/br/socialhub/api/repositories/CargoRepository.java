package br.socialhub.api.repositories;

import br.socialhub.api.enums.RoleType;
import br.socialhub.api.models.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
    Cargo findByDescription(RoleType description);
}