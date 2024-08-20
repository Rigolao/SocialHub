package br.socialhub.api.models;

import br.socialhub.api.enums.TokenStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
    private Usuario usuario;

    @Column(name = "DTINICIO", nullable = false)
    private LocalDateTime dataInicio;

    @Column(name = "DTFIM", nullable = false)
    private LocalDateTime dataFim;

    @Enumerated(EnumType.STRING)
    @Column(name = "IS_USADO")
    private TokenStatus status;
}
