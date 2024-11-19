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
@Table(name = "ANEXO", schema = "socialhub")
@Entity
public class Anexo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDANEXO")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IDPOSTAGEM")
    private Postagem postagem;

    @Column(name = "ARQUIVO", nullable = false)
    private byte[] arquivo;

    @Column(name = "MIMETYPE", nullable = false)
    private String mimeType;

    @Column(name = "NOMEARQUIVO", nullable = false)
    private String nomeArquivo;
}
