package br.socialhub.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "TIPOPARTICIPANTE", schema = "socialhub")
@Entity
public class TipoParticipante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDTIPOPARTICIPANTE")
    private Long id;

    @Column(name = "DESCRICAO", length = 45, nullable = false)
    private String name;

    public TipoParticipante(String typeDefault){
        this.name = typeDefault;
    }
}
