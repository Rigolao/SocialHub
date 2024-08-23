package br.socialhub.api.models;

import br.socialhub.api.enums.DocumentType;
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
    private String name;

//    @Column(name = "SEXO")
//    private String sexo;

    @Column(name = "NUMDOC", length = 50, nullable = false, unique = true)
    private String documentNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "TPDOC", length = 4, nullable = false)
    private DocumentType documentType;

    @Column(name = "EMAIL", length = 100, nullable = false, unique = true)
    @Email
    private String email;

    @Column(name = "SENHA", length = 200, nullable = false)
    private String password;

    @Column(name = "DATA_NASCIMENTO")
    private LocalDate birthDate;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<PlanoUsuario> planosUsuarios;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<UsuarioSpace> usuarioSpaces;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private FotoUsuario userPhoto;


    public Usuario(Long id, String name, String documentNumber, DocumentType documentType, String email, String password, LocalDate dataNascimento){
        this.id = id;
        this.name = name;
        this.documentNumber = documentNumber;
        this.documentType = documentType;
        this.email = email;
        this.password = password;
        this.birthDate = dataNascimento;
    }
}
