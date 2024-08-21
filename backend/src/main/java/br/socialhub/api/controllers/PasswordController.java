package br.socialhub.api.controllers;

import br.socialhub.api.dtos.EmailDTO;
import br.socialhub.api.dtos.ResetPasswordDTO;
import br.socialhub.api.services.EmailService;
import br.socialhub.api.services.TokenService;
import br.socialhub.api.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static br.socialhub.api.utils.Constantes.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(ENDPOINT_PASSWORD)
public class PasswordController {

    private final UserService userService;
    private final EmailService emailService;
    private final TokenService tokenService;

    @PostMapping(ENDPOINT_FORGOT)
    public ResponseEntity<String> forgotPassword(@RequestBody EmailDTO email) {
        var token = userService.generateResetLink(email.email());
        emailService.sendPasswordResetEmail(email.email(), token);

        return ResponseEntity.ok(MESSAGE_SUCESS_FORGOT);
    }

    @PostMapping(ENDPOINT_RESET)
    public ResponseEntity<String> resetPassword(@RequestBody @Valid ResetPasswordDTO resetPasswordDTO) {
        if (!tokenService.isTokenValid(resetPasswordDTO.token())) {
            return ResponseEntity.badRequest().body(MESSAGE_BAD_REQUEST_RESET);
        }

        var user = tokenService.getUserByToken(resetPasswordDTO.token());
        userService.resetPassword(user, resetPasswordDTO);
        tokenService.invalidateToken(resetPasswordDTO.token());

        return ResponseEntity.ok(MESSAGE_SUCESS_RESET);
    }
}
