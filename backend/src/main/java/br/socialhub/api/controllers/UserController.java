package br.socialhub.api.controllers;

import br.socialhub.api.dtos.user.*;
import br.socialhub.api.enums.RoleType;
import br.socialhub.api.services.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
    private final SpaceService spaceService;
    private final PlanService planService;
    private final RoleService roleService;
    private final UserSpaceService userSpaceService;
    private final PlanUserService planUserService;

    @GetMapping("{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable final Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @Transactional
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody @Valid final UserCreateDTO userDTO) {

        var user = userService.createUser(userDTO);
        var plan = planService.findById(userDTO.plan().id());

        planUserService.assignPlanToUser(plan, user, userDTO.plan());

        var space = spaceService.createSpaceDefault();
        var role = roleService.roleCreator();

        userSpaceService.assignRoleToUserInSpace(user, space, role);

        var response = new UserResponseDTO(user);

        var uri = URI.create("/users/" + response.id());

        emailService.sendWelcomeEmail(response.email(), response.name());

        return ResponseEntity.created(uri).body(response);
    }

    @PatchMapping("{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@RequestHeader(AUTHORIZATION) @NotBlank final String token,
                                                      @PathVariable final Long id,
                                                      @RequestBody @Valid UserUpdateDTO userUpdateDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userUpdateDTO));
    }

    @PatchMapping("{id}/password")
    public ResponseEntity<String> updatePasswordUser(@RequestHeader(AUTHORIZATION) @NotBlank final String token,
                                                     @PathVariable final Long id,
                                                     @RequestBody @Valid final UserUpdatePasswordDTO userUpdatePasswordDTO) {
        String email = jwtService.extractSubject(token.replace(BEARER, WHITESPACE));
        userService.validateUser(email, id);
        return ResponseEntity.ok(userService.updatePasswordUser(email, userUpdatePasswordDTO));
    }

    @GetMapping("{id}/photo")
    public ResponseEntity<?> getPhoto(@PathVariable final Long id,
                                      @RequestParam @NotNull final String token) {

        if (!jwtService.validateToken(token.replace(BEARER, WHITESPACE))) {
            return ResponseEntity.badRequest().build();
        }

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
