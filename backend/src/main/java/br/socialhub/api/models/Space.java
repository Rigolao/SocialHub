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
@Table(name = "SPACE", schema = "socialhub")
@Entity
public class Space {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDSPACE")
    private Long id;

    @Column(name = "NOME", length = 50, nullable = false)
    private String nome;

    @OneToMany(mappedBy = "space", fetch = FetchType.LAZY)
    private List<Conta> contas;

    @OneToMany(mappedBy = "space", fetch = FetchType.LAZY)
    private List<ParticipanteSpace> participanteSpaces;
}