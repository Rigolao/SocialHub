package br.socialhub.api.repositories;

import br.socialhub.api.models.TokenAuditoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenAuditoriaRepository extends JpaRepository<TokenAuditoria,String> {
}
