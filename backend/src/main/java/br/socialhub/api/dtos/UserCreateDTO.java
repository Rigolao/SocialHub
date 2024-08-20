package br.socialhub.api.dtos;

import br.socialhub.api.enums.DocumentType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

import static br.socialhub.api.utils.Constantes.*;

public record UserCreateDTO(
        @NotBlank(message = VALIDATION_REQUIRED_NAME)
        @Size(min = 2, max = 50, message = VALIDATION_SIZE_NAME)
        String name,

        @NotNull(message = VALIDATION_REQUIRED_BIRTH_DATE)
        LocalDate birthDate,

        @NotBlank(message = VALIDATION_REQUIRED_DOCUMENT_NUMBER)
        @Size(max = 18, message = VALIDATION_SIZE_DOCUMENT_NUMBER)
        String documentNumber,

        @NotNull(message = VALIDATION_REQUIRED_DOCUMENT_TYPE)
        DocumentType documentType,

        @Email(message = VALIDATION_EMAIL)
        @NotBlank(message = VALIDATION_REQUIRED_EMAIL)
        String email,

        @NotBlank(message = VALIDATION_REQUIRED_PASSWORD)
        @Size(min = 6, message = VALIDATION_SIZE_PASSWORD)
        String password) {
}
