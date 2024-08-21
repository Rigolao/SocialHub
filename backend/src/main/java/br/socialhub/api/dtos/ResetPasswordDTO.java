package br.socialhub.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import static br.socialhub.api.utils.Constantes.*;
import static br.socialhub.api.utils.Constantes.VALIDATION_SIZE_PASSWORD;

public record ResetPasswordDTO(
        @NotBlank(message = VALIDATION_REQUIRED_TOKEN)
        String token,
        @NotBlank(message = VALIDATION_REQUIRED_NEW_PASSWORD)
        @Size(min = 6, message = VALIDATION_SIZE_PASSWORD)
        String newPassword,
        @NotBlank(message = VALIDATION_REQUIRED_CONFIRM_PASSWORD)
        @Size(min = 6, message = VALIDATION_SIZE_PASSWORD)
        String confirmPassword
) {
}
