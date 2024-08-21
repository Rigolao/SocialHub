package br.socialhub.api.controllers;

import br.socialhub.api.dtos.*;
import br.socialhub.api.services.EmailService;
import br.socialhub.api.services.JwtService;
import br.socialhub.api.services.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;

import static br.socialhub.api.utils.Constantes.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(ENDPOINT_USERS)
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final EmailService emailService;

    @GetMapping("{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable final Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody @Valid final UserCreateDTO userCreateDTO) {

        var newUser = userService.createUser(userCreateDTO);
        var uri = URI.create("/users/" + newUser.id());
        emailService.sendWelcomeEmail(newUser.email(), newUser.name());
        return ResponseEntity.created(uri).body(newUser);
    }

    @PatchMapping
    public ResponseEntity<UserResponseDTO> updateUser(@RequestHeader(AUTHORIZATION) final String token,
                                                      @RequestBody @Valid UserUpdateDTO userUpdateDTO) {
        String email = jwtService.extractSubject(token.replace(BEARER, WHITESPACE));
        return ResponseEntity.ok(userService.updateUser(email, userUpdateDTO));
    }

    @PatchMapping("{id}/password")
    public ResponseEntity<String> updatePasswordUser(@RequestHeader(AUTHORIZATION) final String token,
                                                     @PathVariable final Long id,
                                                     @RequestBody @Valid final UserUpdatePasswordDTO userUpdatePasswordDTO) {
        String email = jwtService.extractSubject(token.replace(BEARER, WHITESPACE));
        userService.validateUser(email, id);
        return ResponseEntity.ok(userService.updatePasswordUser(email, userUpdatePasswordDTO));
    }

    @GetMapping("photo")
    public ResponseEntity<byte[]> getPhoto(@RequestHeader(AUTHORIZATION) final String token,
                                           @RequestParam @NotNull final Long id) {

        String email = jwtService.extractSubject(token.replace(BEARER, WHITESPACE));
        userService.validateUser(email, id);

        PhotoResponseDTO fotoResponse = userService.getPhoto(id);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.parseMediaType(fotoResponse.mimeType()))
                .body(fotoResponse.photo());
    }

    @PostMapping("{id}/photo")
    public ResponseEntity<String> uploadFoto(@PathVariable final Long id,
                                             @RequestParam("photo") final MultipartFile file) throws IOException {
        userService.uploadPhoto(id, file);
        return ResponseEntity.ok(MESSAGE_SUCESS_UPLOAD_PHOTO);
    }
}
