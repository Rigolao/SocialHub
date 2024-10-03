package br.socialhub.api.controllers;

import br.socialhub.api.dtos.RoleAssigmentDTO;
import br.socialhub.api.dtos.SocialAccountDTO;
import br.socialhub.api.dtos.space.SpaceCreateDTO;
import br.socialhub.api.dtos.space.SpaceResponseDTO;
import br.socialhub.api.dtos.space.SpaceUpdateDTO;
import br.socialhub.api.dtos.user.InviteUserDTO;
import br.socialhub.api.services.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import static br.socialhub.api.utils.Constantes.AUTHORIZATION;
import static br.socialhub.api.utils.Constantes.ENDPOINT_SPACE;

@RequiredArgsConstructor
@RestController
@RequestMapping(ENDPOINT_SPACE)
public class SpaceController {
    private final JwtService jwtService;
    private final SpaceService spaceService;
    private final UserService userService;
    private final RoleService roleService;
    private final UserSpaceService userSpaceService;
    private final TokenService tokenService;
    private final EmailService emailService;
    private final SocialNetworkService socialNetworkService;

    @Transactional
    @PostMapping
    public ResponseEntity<SpaceResponseDTO> createSpace(@RequestHeader(AUTHORIZATION) @NotBlank final String token,
                                                        @RequestBody @Valid final SpaceCreateDTO spaceCreateDTO) {
        var email = jwtService.extractSubject(token);

        var space = spaceService.createSpace(spaceCreateDTO);
        var user = userService.findByEmail(email);
        var role = roleService.roleCreator();

        userSpaceService.assignRoleToUserInSpace(user, space, role);

        var response = spaceService.createResponse(space);

        return ResponseEntity.ok(response);
    }

    @GetMapping("{id}")
    @PreAuthorize("@userSpaceService.userIsCreatorInSpace(@jwtService.extractSubject(#token), #id)")
    public ResponseEntity<SpaceResponseDTO> getSpace(@RequestHeader(AUTHORIZATION) @NotBlank final String token,
                                                     @PathVariable final Long id) {
        return ResponseEntity.ok(spaceService.getSpaceById(id));
    }

    @PatchMapping("{id}")
    @PreAuthorize("@userSpaceService.userIsCreatorInSpace(@jwtService.extractSubject(#token), #id)")
    public ResponseEntity<SpaceResponseDTO> updateSpace(@PathVariable final Long id,
                                                        @RequestHeader(AUTHORIZATION) final String token,
                                                        @RequestBody @Valid final SpaceUpdateDTO spaceUpdateDTO) {

        return ResponseEntity.ok(spaceService.updateSpace(spaceUpdateDTO, id));
    }

    @Transactional
    @PostMapping("{id}/invitations")
    @PreAuthorize("@userSpaceService.userIsCreatorInSpace(@jwtService.extractSubject(#token), #id)")
    public ResponseEntity<Void> inviteUser(@PathVariable final Long id,
                                           @RequestHeader(AUTHORIZATION) final String token,
                                           @RequestBody @Valid final InviteUserDTO inviteDTO) {
        var user = userService.findById(inviteDTO.idUser());
        var role = roleService.findById(inviteDTO.idRole());
        var space = spaceService.findById(id);

        var link = tokenService.generateInviteLink(user, space, role);
        var userCreator = spaceService.getCreatorInSpace(space);

        emailService.sendInviteUser(space.getName(), user.getName(), user.getEmail(), userCreator.getName(), link);

        return ResponseEntity.ok().build();
    }

    @Transactional
    @PatchMapping("{spaceId}/users/{userId}/roles")
    @PreAuthorize("@userSpaceService.userIsCreatorInSpace(@jwtService.extractSubject(#token), #spaceId)")
    public ResponseEntity<Void> assignRoleToUser(@PathVariable final Long spaceId,
                                                 @PathVariable final Long userId,
                                                 @RequestHeader(AUTHORIZATION) final String token,
                                                 @RequestBody @Valid final RoleAssigmentDTO roleAssigmentDTO){
        var user = userService.findById(userId);
        var space = spaceService.findById(spaceId);
        var role = roleService.findById(roleAssigmentDTO.idRole());

        userSpaceService.updateRoleInSpace(user, space, role);
        return ResponseEntity.ok().build();
    }

    @Transactional
    @DeleteMapping("{spaceId}/users/{userId}")
    @PreAuthorize("@userSpaceService.userIsCreatorInSpace(@jwtService.extractSubject(#token), #spaceId)")
    public ResponseEntity<Void> delete(@PathVariable final Long spaceId,
                                       @PathVariable final Long userId,
                                       @RequestHeader(AUTHORIZATION) final String token){
        var user = userService.findById(userId);
        var space = spaceService.findById(spaceId);

        userSpaceService.removeUserFromSpace(user,space);

        return ResponseEntity.ok().build();
    }

    @Transactional
    @PostMapping("{spaceId}/social-networks/{socialNetworkId}")
    @PreAuthorize("@userSpaceService.userIsCreatorInSpace(@jwtService.extractSubject(#token), #id)")
    public ResponseEntity<Void> associateSocialAccount(@PathVariable final Long spaceId,
                                                       @PathVariable final Long socialNetworkId,
                                                       @RequestBody @Valid final SocialAccountDTO socialAccountDTO,
                                                       @RequestHeader(AUTHORIZATION) final String token){
        var space = spaceService.findById(spaceId);
        var socialNetwork = socialNetworkService.findById(socialNetworkId);

        socialNetworkService.associateSocialAccount(space, socialNetwork, socialAccountDTO);

        return ResponseEntity.ok().build();
    }



}
