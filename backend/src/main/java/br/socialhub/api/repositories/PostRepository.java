package br.socialhub.api.repositories;

import br.socialhub.api.dtos.post.PostQueryDTO;
import br.socialhub.api.models.Postagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PostRepository extends JpaRepository<Postagem, Long> {
    @Query("SELECT NEW br.socialhub.api.dtos.post.PostQueryDTO(p.id, p.titulo, sn.id, sn.nome, p.dataAgendamento, p.status) " +
            "FROM Postagem p " +
            "JOIN p.contaPostagens cp " +
            "JOIN cp.conta c " +
            "JOIN c.socialNetwork sn " +
            "WHERE c.space.id = :spaceId " +
            "AND p.dataAgendamento >= :startOfMonth " +
            "AND p.dataAgendamento < :endOfMonth")
    List<PostQueryDTO> findAllBySpaceIdAndMonthAndYear(@Param("spaceId") Long spaceId,
                                                       @Param("startOfMonth") LocalDateTime startOfMonth,
                                                       @Param("endOfMonth") LocalDateTime endOfMonth);


    @Query("""
                SELECT p
                FROM Postagem p
                WHERE p.status = br.socialhub.api.enums.PostStatus.AGENDADA AND p.dataAgendamento BETWEEN :start AND :end
            """)
    List<Postagem> findByStatusNotAgendadaOrAgendadaBetween(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

}
