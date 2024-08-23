package br.socialhub.api.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
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
    private Usuario user;

    @ManyToOne
    @JoinColumn(name = "IDSPACE")
    private Space space;

    @ManyToOne
    @JoinColumn(name = "IDCARGO")
    private Cargo role;

    @Column(name = "DTVINCULO", nullable = false)
    private LocalDateTime dateCreation;

    @OneToMany(mappedBy = "usuarioSpace")
    private List<Postagem> postagens;

    public UsuarioSpace(Usuario user, Space space, Cargo role){
        this.space = space;
        this.user = user;
        this.role = role;
        this.dateCreation = LocalDateTime.now();
    }
}
