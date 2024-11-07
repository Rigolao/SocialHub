package br.socialhub.api.repositories;

import br.socialhub.api.models.Postagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PostRepository extends JpaRepository<Postagem, Long> {
    @Query("SELECT p FROM Postagem p JOIN p.usuarioSpace us JOIN us.space s " +
            "WHERE s.id = :spaceId " +
            "AND p.dataAgendamento >= :startOfMonth " +
            "AND p.dataAgendamento < :endOfMonth")
    List<Postagem> findAllBySpaceIdAndMonthAndYear(@Param("spaceId") Long spaceId,
                                                   @Param("startOfMonth") LocalDateTime startOfMonth,
                                                   @Param("endOfMonth") LocalDateTime endOfMonth);
}
