package br.socialhub.api.controllers;

import br.socialhub.api.services.InsightService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("insight")
@RequiredArgsConstructor
public class InsightController {
    private final InsightService insightService;

    @PostMapping
    public Mono<String> teste(@RequestBody String topic){
        return insightService.createInsight(topic).map(response -> response.candidates().get(0).content().parts().get(0).text());
    }

}
