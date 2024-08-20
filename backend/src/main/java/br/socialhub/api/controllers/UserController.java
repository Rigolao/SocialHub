package br.socialhub.api.controllers;

import br.socialhub.api.dtos.PhotoResponseDTO;
import br.socialhub.api.dtos.UserCreateDTO;
import br.socialhub.api.dtos.UserResponseDTO;
import br.socialhub.api.models.Usuario;
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

import static br.socialhub.api.utils.Constantes.ENDPOINT_USERS;
import static br.socialhub.api.utils.Constantes.MESSAGE_SUCESS_UPLOAD_PHOTO;

@RequiredArgsConstructor
@RestController
@RequestMapping(ENDPOINT_USERS)
public class UserController {

    private final UserService userService;

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

    @GetMapping("{id}/photo")
    public ResponseEntity<byte[]> getFoto (@PathVariable Long id){
        PhotoResponseDTO fotoResponse = userService.getPhoto(id);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.parseMediaType(fotoResponse.mimeType()))
                .body(fotoResponse.photo());
    }

    @PostMapping("{id}/photo")
    public ResponseEntity<String> uploadFoto (@PathVariable Long id, @RequestParam("foto") MultipartFile foto) throws IOException {
        userService.uploadPhoto(id, foto);
        return ResponseEntity.ok(MESSAGE_SUCESS_UPLOAD_PHOTO);

    }
}
