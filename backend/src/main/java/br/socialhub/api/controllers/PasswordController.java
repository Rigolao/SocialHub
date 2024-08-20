package br.socialhub.api.controllers;

import br.socialhub.api.services.EmailService;
import br.socialhub.api.services.TokenService;
import br.socialhub.api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static br.socialhub.api.utils.Constantes.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(ENDPOINT_PASSWORD)
public class PasswordController {

    private final UserService userService;
    private final EmailService emailService;
    private final TokenService tokenService;

    @PostMapping(ENDPOINT_FORGOT)
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        var token = userService.generateResetLink(email);
        emailService.sendPasswordResetEmail(email, token);

        return ResponseEntity.ok(MESSAGE_SUCESS_FORGOT);
    }

    @PostMapping(ENDPOINT_RESET)
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        if (!tokenService.isTokenValid(token)) {
            return ResponseEntity.badRequest().body(MESSAGE_BAD_REQUEST_RESET);
        }

        var user = tokenService.getUserByToken(token);
        userService.resetPassword(user, newPassword);
        tokenService.invalidateToken(token);

        return ResponseEntity.ok(MESSAGE_SUCESS_RESET);
    }
}
