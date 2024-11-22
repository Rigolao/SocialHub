package br.socialhub.api.dtos.post;

import br.socialhub.api.enums.PostStatus;

import java.time.LocalDateTime;

public record PostQueryDTO(Long id, String descricao, Long idRedeSocial, String nomeRedeSocial, LocalDateTime dataAgendamento, PostStatus status) {
}
