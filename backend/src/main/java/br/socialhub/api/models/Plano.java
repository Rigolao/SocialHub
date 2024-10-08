package br.socialhub.api.models;

import br.socialhub.api.converters.PlanTypeConverter;
import br.socialhub.api.enums.PlanType;
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
@Table(name = "PLANO", schema = "socialhub")
@Entity
public class Plano {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPLANO")
    private Long id;

    @Column(name = "DESCRICAO", nullable = false)
    private String description;

    @Column(name = "NOME", length = 45, nullable = false)
    @Convert(converter = PlanTypeConverter.class)
    private PlanType name;

    @OneToMany(mappedBy = "plan", fetch = FetchType.LAZY)
    private List<PlanoUsuario> planosUsuarios;
}
