package br.socialhub.api.models;

import br.socialhub.api.dtos.plan.PlanDTO;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "PLANO_USUARIO", schema = "socialhub")
@Entity
public class PlanoUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPLANO_USUARIO")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IDPLANO", referencedColumnName = "IDPLANO", nullable = false)
    private Plano plan;

    @ManyToOne
    @JoinColumn(name = "IDUSUARIO", referencedColumnName = "IDUSUARIO", nullable = false)
    private Usuario user;

    @Column(name = "DATA_INICIO", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime startDate;

    @Column(name = "DATA_FIM")
    private LocalDateTime endDate;

    @Column(name = "VALOR", precision = 10, scale = 2)
    private BigDecimal value;

    public PlanoUsuario(Plano plan, Usuario user, PlanDTO planDTO){
        this.plan = plan;
        this.user = user;
        this.startDate = planDTO.startDate().atTime(LocalDateTime.now().getHour(), LocalDateTime.now().getMinute(), LocalDateTime.now().getSecond());
        this.endDate = endDate != null ? planDTO.endDate().atTime(23,59,59) : null;
        this.value = planDTO.value();
    }
}
