package br.socialhub.api.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "SPACE", schema = "socialhub")
@Entity
public class Space {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDSPACE")
    private Long id;

    @Column(name = "NOME", length = 50, nullable = false)
    private String name;

    @Column(name = "DTCRIACAO")
    private LocalDateTime dateCreation;

    @OneToMany(mappedBy = "space", fetch = FetchType.LAZY)
    private List<Conta> accounts;

    @OneToMany(mappedBy = "space", fetch = FetchType.LAZY)
    private List<UsuarioSpace> userSpaces;

    public Space (String name){
        this.name = name;
        this.dateCreation = LocalDateTime.now();
    }
}
