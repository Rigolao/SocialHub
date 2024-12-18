package br.socialhub.api.models;

import br.socialhub.api.enums.PostStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "POSTAGEM", schema = "socialhub")
@Entity
public class Postagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPOSTAGEM")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IDUSUARIOSPACE")
    private UsuarioSpace usuarioSpace;

    @Column(name = "TITULO", nullable = false)
    private String titulo;

    @Column(name = "DESCRICAO", nullable = false)
    private String descricao;

    @Column(name = "STATUS")
    @Enumerated(EnumType.STRING)
    private PostStatus status;

    @Column(name = "DATAAGENDAMENTO", nullable = false)
    private LocalDateTime dataAgendamento;

    @OneToMany(mappedBy = "postagem", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ContaPostagem> contaPostagens;

    @OneToMany(mappedBy = "postagem", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Anexo> anexos;
}
