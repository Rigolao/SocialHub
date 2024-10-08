package br.socialhub.api.models;

import br.socialhub.api.converters.TokenStatusConverter;
import br.socialhub.api.enums.TokenStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static br.socialhub.api.utils.Constantes.ONE_DAY;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "TOKEN_AUDITORIA", schema = "socialhub")
public class TokenAuditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String token;

    @ManyToOne
    @JoinColumn(name = "IDUSUARIO",referencedColumnName = "IDUSUARIO", nullable = false)
    private Usuario user;

    @Column(name = "DTINICIO", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "DTFIM", nullable = false)
    private LocalDateTime endDate;


    @Column(name = "IS_USADO")
    @Convert(converter = TokenStatusConverter.class)
    private TokenStatus status;

    public TokenAuditoria(Usuario user) {
        this.user = user;
        this.startDate = LocalDateTime.now();
        this.endDate = startDate.plusDays(ONE_DAY);
        this.status = TokenStatus.UNUSED;
    }
}
