package br.socialhub.api.dtos.post;

import java.time.LocalDateTime;

public record PostQueryDTO(Long id, String descricao, Long idRedeSocial, String nomeRedeSocial, LocalDateTime dataAgendamento) {
}
