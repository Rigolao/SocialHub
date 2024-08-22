package br.socialhub.api.dtos.reset_password;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import static br.socialhub.api.utils.Constantes.VALIDATION_EMAIL;
import static br.socialhub.api.utils.Constantes.VALIDATION_REQUIRED_EMAIL;

public record EmailDTO(  @Email(message = VALIDATION_EMAIL)
                         @NotBlank(message = VALIDATION_REQUIRED_EMAIL) String email) {
}
