package br.socialhub.api.dtos.space;

import jakarta.validation.constraints.NotBlank;

public record SpaceUpdateDTO(
        @NotBlank
        String name

) {
}
