package br.socialhub.api.dtos.post;

import br.socialhub.api.dtos.social_media.SocialMediaResponseDTO;
import br.socialhub.api.enums.PostStatus;
import br.socialhub.api.models.Conta;
import br.socialhub.api.models.ContaPostagem;
import br.socialhub.api.models.Postagem;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record PostDTO (Long id, String title, LocalDateTime scheduledDate, PostStatus status, List<SocialMediaResponseDTO> socialNetworks){
    public PostDTO (Postagem postagem){
        this(
                postagem.getId(),
                postagem.getTitulo(),
                postagem.getDataAgendamento(),
                postagem.getStatus(),
                postagem.getContaPostagens().stream()
                        .map(ContaPostagem::getConta)
                        .map(Conta::getSocialNetwork)
                        .map(SocialMediaResponseDTO::new)
                        .collect(Collectors.toList())
        );
    }
}
