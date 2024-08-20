package br.socialhub.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "CONTA_POSTAGEM", schema = "socialhub")
@Entity
public class ContaPostagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDCONTA_POSTAGEM")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IDCONTA")
    private Conta conta;

    @ManyToOne
    @JoinColumn(name = "IDPOSTAGEM")
    private Postagem postagem;

    @Column(name = "DATAPOSTAGEM")
    private LocalDateTime dataPostagem;
}
