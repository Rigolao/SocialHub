package br.socialhub.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
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
    private Plano plano;

    @ManyToOne
    @JoinColumn(name = "IDUSUARIO", referencedColumnName = "IDUSUARIO", nullable = false)
    private Usuario usuario;

    @Column(name = "DATA_INICIO", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dataInicio;

    @Column(name = "DATA_FIM")
    private LocalDateTime dataFim;

    @Column(name = "VALOR", precision = 10, scale = 2)
    private BigDecimal valor;
}
