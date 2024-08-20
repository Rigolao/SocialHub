package br.socialhub.api.controllers;

import br.socialhub.api.dtos.FotoResponseDTO;
import br.socialhub.api.dtos.UserCreateDTO;
import br.socialhub.api.dtos.UserResponseDTO;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.services.EmailService;
import br.socialhub.api.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("users")
public class UserController {

    private final UserService userService;
    private final EmailService emailService;

    @GetMapping("{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUser(id));
    }
    @PostMapping
    public ResponseEntity<Usuario> createUser(@RequestBody @Valid UserCreateDTO userCreateDTO){

        var novoUsuario = userService.createUser(userCreateDTO);
        var uri = URI.create("/users/" + novoUsuario.getId());
        return ResponseEntity.created(uri).body(novoUsuario);
    }

    @GetMapping("{id}/foto")
    public ResponseEntity<byte[]> getFoto (@PathVariable Long id){
        FotoResponseDTO fotoResponse = userService.getFoto(id);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.parseMediaType(fotoResponse.mimeType()))
                .body(fotoResponse.imagem());
    }

    @PostMapping("{id}/foto")
    public ResponseEntity<String> uploadFoto (@PathVariable Long id, @RequestParam("foto") MultipartFile foto) throws IOException {
        return ResponseEntity.ok(userService.uploadFoto(id, foto));

    }
}
