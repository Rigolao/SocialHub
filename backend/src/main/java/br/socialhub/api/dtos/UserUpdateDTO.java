package br.socialhub.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

import static br.socialhub.api.utils.Constantes.*;

public record UserUpdateDTO (
        @NotBlank(message = VALIDATION_REQUIRED_NAME)
        @Size(min = 2, max = 50, message = VALIDATION_SIZE_NAME)
        String name,
        @NotNull(message = VALIDATION_REQUIRED_BIRTH_DATE)
        LocalDate birthDate
){
}
