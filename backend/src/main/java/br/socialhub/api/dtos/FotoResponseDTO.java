package br.socialhub.api.dtos;

import br.socialhub.api.models.FotoUsuario;

public record FotoResponseDTO(byte[] imagem, String mimeType) {
    public FotoResponseDTO(FotoUsuario fotoUsuario) {
        this(
                fotoUsuario.getArquivo(),
                fotoUsuario.getMimeType()
        );
    }

}
