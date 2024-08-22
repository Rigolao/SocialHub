package br.socialhub.api.controllers;

import br.socialhub.api.dtos.security.AuthenticateResponseDTO;
import br.socialhub.api.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static br.socialhub.api.utils.Constantes.ENDPOINT_AUTHENTICATE;

@RestController
@RequestMapping(ENDPOINT_AUTHENTICATE)
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping
    public ResponseEntity<AuthenticateResponseDTO> authenticate(Authentication authentication){
        return ResponseEntity.ok(authenticationService.authenticate(authentication));
    }
}
