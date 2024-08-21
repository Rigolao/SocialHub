package br.socialhub.api.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "PARTICIPANTE", schema = "socialhub")
@Entity
public class Participante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPARTICIPANTE")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IDUSUARIO")
    private Usuario usuario;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "IDTIPOPARTICIPANTE")
    private TipoParticipante tipoParticipante;

    @OneToMany(mappedBy = "participante", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ParticipanteSpace> participanteSpaces;
}
