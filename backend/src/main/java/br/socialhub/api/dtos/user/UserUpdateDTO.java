package br.socialhub.api.dtos.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

import static br.socialhub.api.utils.Constantes.*;

public record UserUpdateDTO (
        @NotBlank(message = VALIDATION_REQUIRED_NAME)
        @Size(min = 2, max = 50, message = VALIDATION_SIZE_NAME)
        String name,
        @NotNull(message = VALIDATION_REQUIRED_BIRTH_DATE)
        @JsonFormat(pattern = DATE_FORMAT_DD_MM_YYYY)
        LocalDate birthDate
){
}
