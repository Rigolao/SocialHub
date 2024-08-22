package br.socialhub.api.dtos.user;

import br.socialhub.api.models.FotoUsuario;

public record PhotoResponseDTO(byte[] photo, String mimeType) {
    public PhotoResponseDTO(FotoUsuario fotoUsuario) {
        this(
                fotoUsuario.getArquivo(),
                fotoUsuario.getMimeType()
        );
    }

}
