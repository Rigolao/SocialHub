package br.socialhub.api.dtos.post;

public record FileCreateDTO(
        String fileName,
        String mimeType,
        byte[] file) {
}
