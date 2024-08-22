package br.socialhub.api.dtos.user;

import br.socialhub.api.enums.DocumentType;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

import static br.socialhub.api.utils.Constantes.*;

public record UserCreateDTO(
        @NotBlank(message = VALIDATION_REQUIRED_NAME)
        @Size(min = 2, max = 50, message = VALIDATION_SIZE_NAME)
        String name,

        @NotNull(message = VALIDATION_REQUIRED_BIRTH_DATE)
        @JsonFormat(pattern = DATE_FORMAT_DD_MM_YYYY)
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
