package br.socialhub.api.controllers;

import br.socialhub.api.dtos.reset_password.EmailDTO;
import br.socialhub.api.dtos.reset_password.ResetPasswordDTO;
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
        var user = userService.findByEmail(email.email());
        var link = tokenService.generateResetLink(user);
        emailService.sendPasswordResetEmail(email.email(), link, user.getName());

        return ResponseEntity.ok(MESSAGE_SUCESS_FORGOT);
    }

    @PostMapping(ENDPOINT_RESET)
    public ResponseEntity<String> resetPassword(@RequestBody @Valid ResetPasswordDTO resetPasswordDTO) {
        tokenService.validateToken(resetPasswordDTO.token());
        var user = tokenService.getUserByToken(resetPasswordDTO.token());
        userService.resetPassword(user, resetPasswordDTO);

        return ResponseEntity.ok(MESSAGE_SUCESS_RESET);
    }
}
