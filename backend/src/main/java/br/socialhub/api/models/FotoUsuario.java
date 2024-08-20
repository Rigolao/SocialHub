package br.socialhub.api.models;

import br.socialhub.api.utils.FotoUtil;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "FOTOUSUARIO", schema = "socialhub")
@Entity
public class FotoUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDFOTOUSUARIO")
    private Long id;

    @OneToOne
    @JoinColumn(name = "IDUSUARIO", referencedColumnName = "IDUSUARIO", nullable = false)
    private Usuario usuario;

    @Column(name = "NOMEARQUIVO", nullable = false, length = 45)
    private String nomeArquivo;

    @Column(name = "MIMETYPE", nullable = false, length = 45)
    private String mimeType;

    @Lob
    @Column(name = "ARQUIVO", nullable = false)
    private byte[] arquivo;

    public void setArquivo(byte[] arquivo) {
        this.arquivo = FotoUtil.compressImage(arquivo);
    }

    public byte[] getArquivo() {
        return FotoUtil.decompressImage(arquivo);
    }
}
