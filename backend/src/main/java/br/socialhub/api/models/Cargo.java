package br.socialhub.api.models;

import br.socialhub.api.converters.RoleTypeConverter;
import br.socialhub.api.enums.RoleType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "CARGO", schema = "socialhub")
@Entity
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDCARGO")
    private Long id;

    @Column(name = "DESCRICAO", length = 45, nullable = false)
    @Convert(converter = RoleTypeConverter.class)
    private RoleType description;

    public Cargo(final RoleType roleType){
        this.description = roleType;
    }
}
