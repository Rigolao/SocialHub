package br.socialhub.api.controllers;

import br.socialhub.api.dtos.user.*;
import br.socialhub.api.services.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import static br.socialhub.api.utils.Constantes.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(ENDPOINT_USERS)
public class UserController {

    private final UserService userService;
    private final EmailService emailService;
    private final SpaceService spaceService;
    private final PlanService planService;
    private final RoleService roleService;
    private final UserSpaceService userSpaceService;
    private final PlanUserService planUserService;

    @GetMapping("{id}")
    @PreAuthorize("@userService.isUserSelf(@jwtService.extractSubject(#token), #id)")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable final Long id,
                                                   @RequestHeader(AUTHORIZATION) final String token) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @GetMapping("search")
    public ResponseEntity<List<UserBasicResponseDTO>> findUserByLikeEmail(@RequestParam final String filter) {
        return ResponseEntity.ok(userService.searchUserByEmail(filter));
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
    @PreAuthorize("@userService.isUserSelf(@jwtService.extractSubject(#token), #id)")
    public ResponseEntity<UserResponseDTO> updateUser(@RequestHeader(AUTHORIZATION) @NotBlank final String token,
                                                      @PathVariable final Long id,
                                                      @RequestBody @Valid UserUpdateDTO userUpdateDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userUpdateDTO));
    }

    @PatchMapping("{id}/password")
    @PreAuthorize("@userService.isUserSelf(@jwtService.extractSubject(#token), #id)")
    public ResponseEntity<String> updatePasswordUser(@RequestHeader(AUTHORIZATION) @NotBlank final String token,
                                                     @PathVariable final Long id,
                                                     @RequestBody @Valid final UserUpdatePasswordDTO userUpdatePasswordDTO) {
        return ResponseEntity.ok(userService.updatePasswordUser(id, userUpdatePasswordDTO));
    }

    @GetMapping("{id}/photo")
    @PreAuthorize("@userService.isUserSelf(@jwtService.extractSubject(#token), #id)")
    public ResponseEntity<byte[]> getPhoto(@RequestHeader(AUTHORIZATION) @NotBlank final String token,
                                           @PathVariable final Long id) {

        PhotoResponseDTO fotoResponse = userService.getPhoto(id);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.parseMediaType(fotoResponse.mimeType()))
                .body(fotoResponse.photo());
    }

    @PostMapping("{id}/photo")
    @PreAuthorize("@userService.isUserSelf(@jwtService.extractSubject(#token), #id)")
    public ResponseEntity<String> uploadFoto(@RequestHeader(AUTHORIZATION) @NotBlank final String token,
                                             @PathVariable final Long id,
                                             @RequestParam("photo") final MultipartFile file) throws IOException {
        userService.uploadPhoto(id, file);
        return ResponseEntity.ok(MESSAGE_SUCESS_UPLOAD_PHOTO);
    }
}
