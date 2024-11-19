package br.socialhub.api.controllers;

import br.socialhub.api.services.BlueSkyService;
import br.socialhub.api.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("bluesky")
@RequiredArgsConstructor
public class BlueSkyController {

    private final BlueSkyService blueSkyService;

    private final PostService postService;

    @PostMapping("auth")
    public ResponseEntity<String> auth() {
        blueSkyService.auth();
        return ResponseEntity.ok("ok");
    }

    @GetMapping
    public void teste(){
        postService.buscarPorDataAgendamento();
    }
}
