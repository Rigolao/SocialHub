package br.socialhub.api.dtos.post;

import br.socialhub.api.dtos.anexos.AnexoDTO;
import br.socialhub.api.dtos.social_media.SocialMediaResponseDTO;
import br.socialhub.api.enums.PostStatus;
import br.socialhub.api.models.Conta;
import br.socialhub.api.models.ContaPostagem;
import br.socialhub.api.models.Postagem;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public record PostResponseDTO(Long id, String title, String description, LocalDateTime scheduledDate, PostStatus status, List<SocialMediaResponseDTO> socialNetworks, List<AnexoDTO> attachments) {
    public PostResponseDTO(Postagem postagem){
        this(
                postagem.getId(),
                postagem.getTitulo(),
                postagem.getDescricao(),
                postagem.getDataAgendamento(),
                postagem.getStatus(),
                postagem.getContaPostagens().stream()
                        .map(ContaPostagem::getConta)
                        .map(Conta::getSocialNetwork)
                        .map(SocialMediaResponseDTO::new)
                        .collect(Collectors.toList()),
                Optional.ofNullable(postagem.getAnexos())
                        .orElse(Collections.emptyList())
                        .stream()
                        .map(AnexoDTO::new)
                        .collect(Collectors.toList())
        );
    }
}
