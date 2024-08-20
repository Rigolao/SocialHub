package br.socialhub.api.dtos;

import br.socialhub.api.enums.TipoDeDocumento;
import br.socialhub.api.models.Usuario;

import java.time.LocalDate;

public record UserResponseDTO(
        Long id,
        String nome,
        String email,
        LocalDate dataNascimento,
        String numeroDocumento,
        TipoDeDocumento tipoDocumento,
        String url_foto
) {

    public UserResponseDTO(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getDataNascimento(),
                usuario.getNumeroDocumento(),
                usuario.getTipoDocumento(),
                String.format("http://localhost:8080/users/%s/foto", usuario.getId())
        );
    }
}
