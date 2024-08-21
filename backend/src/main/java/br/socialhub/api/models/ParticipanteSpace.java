package br.socialhub.api.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "PARTICIPANTE_SPACE", schema = "socialhub")
@Entity
public class ParticipanteSpace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPARTICIPANTE_SPACE")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IDPARTICIPANTE")
    private Participante participante;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "IDSPACE")
    private Space space;

    @OneToMany(mappedBy = "participanteSpace")
    private List<Postagem> postagens;
}
