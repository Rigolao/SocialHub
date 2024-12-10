package br.socialhub.api.services;

import br.socialhub.api.dtos.gemini.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class InsightService {
    private final WebClient webClient;
    public InsightService(WebClient.Builder builder, @Value("${google.api.key}") String apikey){
        String url = String.format("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=%s", apikey);
        System.out.println(url);
        this.webClient = builder
                .baseUrl(url)
                .defaultHeader("ContentRequest-Type", "application/json")
                .build();
    }
    public Mono<GeminiResponseDTO> createInsight(String topic){
        GeminiResquestDTO request = _createInsightRequest(topic);

        return webClient.post().bodyValue(request).retrieve().bodyToMono(GeminiResponseDTO.class);
    }

    private GeminiResquestDTO _createInsightRequest(String topic) {
        String systemInstructionText = "Você é uma IA especializada em copywriting. Auxilie na criação de uma descrição de post sobre o tema fornecido, com no máximo 2000 caracteres. Ofereça até 2 opções de descrição. O padrão da resposta deve ser assim, respeitando todas as qeubras de linha e espaços:\n" +
                "**Opção 1 (Foco em 1):**\n" +
                "\n" +
                "> Descrição da opcão 1\n" +
                "\n" +
                "\n" +
                "**Opção 2 (Foco em 2):**\n" +
                "\n" +
                "> Descrição da opcão 2\n";


        SystemInstruction systemInstruction = SystemInstruction.builder()
                .parts(List.of(new Parts(systemInstructionText)))
                .build();

        ContentRequest contentRequest = ContentRequest.builder()
                .parts(List.of(new Parts(topic)))
                .build();

        return new GeminiResquestDTO(systemInstruction, contentRequest);
    }
}
