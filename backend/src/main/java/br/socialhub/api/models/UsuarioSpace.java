package br.socialhub.api.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "USUARIO_SPACE", schema = "socialhub")
@Entity
public class UsuarioSpace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDUSUARIOSPACE")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IDUSUARIO")
    private Usuario usuario;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "IDSPACE")
    private Space space;

    @OneToMany(mappedBy = "usuarioSpace")
    private List<Postagem> postagens;

    @OneToMany
    @Column(name = "IDCARGO")
    private List<Cargo> cargo;
}
