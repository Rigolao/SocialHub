package br.socialhub.api.controllers;

import br.socialhub.api.services.BlueSkyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("bluesky")
@Slf4j
@RequiredArgsConstructor
public class BlueSkyController {

    private final BlueSkyService blueSkyService;
    @PostMapping("auth")
    public ResponseEntity<String> auth() {
        blueSkyService.auth();
        return ResponseEntity.ok("ok");
    }
}
