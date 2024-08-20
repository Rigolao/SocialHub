package br.socialhub.api.models;

import br.socialhub.api.enums.TipoDeDocumento;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "USUARIO", schema = "socialhub")
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDUSUARIO")
    private Long id;

    @Column(name = "NOME", length = 50)
    private String nome;

//    @Column(name = "SEXO")
//    private String sexo;

    @Column(name = "NUMDOC", length = 50, nullable = false, unique = true)
    private String numeroDocumento;

    @Enumerated(EnumType.STRING)
    @Column(name = "TPDOC", length = 4, nullable = false)
    private TipoDeDocumento tipoDocumento;

    @Column(name = "EMAIL", length = 100, nullable = false, unique = true)
    @Email
    private String email;

    @Column(name = "SENHA", length = 200, nullable = false)
    private String senha;

    @Column(name = "DATA_NASCIMENTO")
    private LocalDate dataNascimento;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    private List<PlanoUsuario> planosUsuarios;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    private List<Participante> participantes;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    private FotoUsuario fotoUsuario;
}
