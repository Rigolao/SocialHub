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

    @OneToOne
    @JoinColumn(name = "IDTIPOPARTICIPANTE")
    private TipoParticipante tipoParticipante;

    @OneToMany(mappedBy = "participante", fetch = FetchType.LAZY)
    private List<ParticipanteSpace> participanteSpaces;
}
