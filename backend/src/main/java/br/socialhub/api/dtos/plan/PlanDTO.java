package br.socialhub.api.dtos.plan;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

import static br.socialhub.api.utils.Constantes.DATE_FORMAT_DD_MM_YYYY;

public record PlanDTO(
        @NotNull
        Long id,
        @NotNull
        BigDecimal value,
        @NotNull
        @JsonFormat(pattern = DATE_FORMAT_DD_MM_YYYY)
        LocalDate startDate,
        @JsonFormat(pattern = DATE_FORMAT_DD_MM_YYYY)
        LocalDate endDate
) {
}
