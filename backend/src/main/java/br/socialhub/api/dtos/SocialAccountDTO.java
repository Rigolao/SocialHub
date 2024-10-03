package br.socialhub.api.dtos;

import jakarta.validation.constraints.NotBlank;

public record SocialAccountDTO(@NotBlank String token) {
}
