package br.socialhub.api.dtos.gemini;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record GeminiResquestDTO(SystemInstruction systemInstruction, ContentRequest contents) {
}

