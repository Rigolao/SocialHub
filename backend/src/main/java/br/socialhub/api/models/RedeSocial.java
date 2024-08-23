package br.socialhub.api.models;

import br.socialhub.api.converters.SocialMediaTypeConverter;
import br.socialhub.api.enums.SocialMediaType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "REDESOCIAL", schema = "socialhub")
@Entity
public class RedeSocial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDREDESOCIAL")
    private Long id;

    @Column(name = "DESCRICAO", nullable = false, length = 45)
    @Convert(converter = SocialMediaTypeConverter.class)
    private SocialMediaType descricao;
}
