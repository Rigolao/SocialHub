package br.socialhub.api.dtos.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import static br.socialhub.api.utils.Constantes.*;

public record UserUpdatePasswordDTO(
        @NotBlank(message = VALIDATION_REQUIRED_PASSWORD)
        @Size(min = 6, message = VALIDATION_SIZE_PASSWORD)
        String currentPassword,
        @NotBlank(message = VALIDATION_REQUIRED_NEW_PASSWORD)
        @Size(min = 6, message = VALIDATION_SIZE_PASSWORD)
        String newPassword,
        @NotBlank(message = VALIDATION_REQUIRED_CONFIRM_PASSWORD)
        @Size(min = 6, message = VALIDATION_SIZE_PASSWORD)
        String confirmPassword
) {
}
