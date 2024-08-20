package br.socialhub.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "CONTA", schema = "socialhub")
@Entity
public class Conta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDCONTA")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IDSPACE", referencedColumnName = "IDSPACE", nullable = false)
    private Space space;

    @OneToOne
    @JoinColumn(name = "IDREDESOCIAL", referencedColumnName = "IDREDESOCIAL", nullable = false)
    private RedeSocial redeSocial;

    @OneToMany(mappedBy = "conta", fetch = FetchType.LAZY)
    private List<ContaPostagem> contaPostagem;
}
