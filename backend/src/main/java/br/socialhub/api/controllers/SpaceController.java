package br.socialhub.api.controllers;

import br.socialhub.api.dtos.RoleAssigmentDTO;
import br.socialhub.api.dtos.post.PostCreateDTO;
import br.socialhub.api.dtos.post.PostDTO;
import br.socialhub.api.dtos.post.PostResponseDTO;
import br.socialhub.api.dtos.post.PostUpdateDTO;
import br.socialhub.api.dtos.social_media.SocialMediaResponseDTO;
import br.socialhub.api.dtos.space.SpaceCreateDTO;
import br.socialhub.api.dtos.space.SpaceResponseDTO;
import br.socialhub.api.dtos.space.SpaceUpdateDTO;
import br.socialhub.api.dtos.user.InviteUserDTO;
import br.socialhub.api.services.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

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
    private final PostService postService;


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
                                                 @RequestBody @Valid final RoleAssigmentDTO roleAssigmentDTO) {
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
                                       @RequestHeader(AUTHORIZATION) final String token) {
        var user = userService.findById(userId);
        var space = spaceService.findById(spaceId);

        userSpaceService.removeUserFromSpace(user, space);

        return ResponseEntity.ok().build();
    }

    @GetMapping("{spaceId}/social-networks")
    @PreAuthorize("@userSpaceService.userIsCreatorInSpace(@jwtService.extractSubject(#token), #spaceId)")
    public ResponseEntity<List<SocialMediaResponseDTO>> getSocialNetworksForSpace(@PathVariable final Long spaceId,
                                                                                  @RequestHeader(AUTHORIZATION) final String token) {

        return ResponseEntity.ok(spaceService.getSocialNetworksForSpace(spaceId));
    }


    @GetMapping("{spaceId}/posts")
    @PreAuthorize("@userSpaceService.userIsCreatorOrEditorInSpace(@jwtService.extractSubject(#token), #spaceId)")
    public ResponseEntity<List<PostDTO>> getSpacePosts(@PathVariable final Long spaceId,
                                                       @RequestHeader(AUTHORIZATION) final String token,
                                                       @RequestParam(defaultValue = "#{T(java.time.LocalDate).now().getYear()}") int year,
                                                       @RequestParam(defaultValue = "#{T(java.time.LocalDate).now().getMonthValue()}") int month) {
        List<PostDTO> posts = spaceService.getSpacePosts(spaceId, year, month);

        return ResponseEntity.ok(posts);
    }


    @PostMapping("{spaceId}/social-networks/{idSocialNetwork}")
    @PreAuthorize("@userSpaceService.userIsCreatorInSpace(@jwtService.extractSubject(#tokeJwt), #spaceId)")
    public ResponseEntity<Void> associateAccountWithSpace(@PathVariable final Long spaceId,
                                                          @PathVariable final Long idSocialNetwork,
                                                          @RequestHeader(AUTHORIZATION) final String tokeJwt,
                                                          @RequestBody String token) {
        var space = spaceService.findById(spaceId);
        var socialNetwork = socialNetworkService.findById(idSocialNetwork);

        spaceService.associateAccountWithSpace(space, socialNetwork, token);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{spaceId}/social-networks/{idSocialNetwork}")
    @PreAuthorize("@userSpaceService.userIsCreatorInSpace(@jwtService.extractSubject(#tokeJwt), #spaceId)")
    public ResponseEntity<Void> dissociateAccountFromSpace(@PathVariable final Long spaceId,
                                                          @PathVariable final Long idSocialNetwork,
                                                          @RequestHeader(AUTHORIZATION) final String tokeJwt) {
        var space = spaceService.findById(spaceId);
        var socialNetwork = socialNetworkService.findById(idSocialNetwork);

        spaceService.dissociateAccountFromSpace(space, socialNetwork);

        return ResponseEntity.ok().build();
    }


    @GetMapping("{spaceId}/posts/{postId}")
    @PreAuthorize("@userSpaceService.userIsCreatorOrEditorInSpace(@jwtService.extractSubject(#token), #spaceId)")
    public ResponseEntity<PostResponseDTO> getPosts(@PathVariable final Long spaceId,
                                                  @PathVariable final Long postId,
                                                  @RequestHeader(AUTHORIZATION) final String token) {
        return ResponseEntity.ok(postService.getPostById(postId));
    }

    @PostMapping("{spaceId}/posts")
    @PreAuthorize("@userSpaceService.userIsCreatorOrEditorInSpace(@jwtService.extractSubject(#token), #spaceId)")
    public ResponseEntity<PostResponseDTO> createPosts(@PathVariable final Long spaceId,
                                                       @ModelAttribute PostCreateDTO post,
                                                       @RequestHeader(AUTHORIZATION) final String token) throws IOException {

        var email = jwtService.extractSubject(token);
        var user = userService.findByEmail(email);
        var space = spaceService.findById(spaceId);
        var userSpace = userSpaceService.findByUserAndSpace(user, space);
        var accounts = space.getAccounts();


        return ResponseEntity.ok(postService.createPost(post, userSpace, accounts));
    }

    @Transactional
    @PatchMapping("{spaceId}/posts/{postId}")
    @PreAuthorize("@userSpaceService.userIsCreatorOrEditorInSpace(@jwtService.extractSubject(#token), #spaceId)")
    public ResponseEntity<PostResponseDTO> updatePost(@PathVariable final Long spaceId,
                                                      @PathVariable final Long postId,
                                                      @ModelAttribute PostUpdateDTO post,
                                                      @RequestHeader(AUTHORIZATION) final String token) throws IOException {

        var email = jwtService.extractSubject(token);
        var user = userService.findByEmail(email);
        var space = spaceService.findById(spaceId);
        var userSpace = userSpaceService.findByUserAndSpace(user, space);

        var accounts = space.getAccounts();

        return ResponseEntity.ok(postService.updatePost(postId, post, userSpace, accounts));
    }

    @Transactional
    @DeleteMapping("{spaceId}/posts/{postId}")
    @PreAuthorize("@userSpaceService.userIsCreatorInSpace(@jwtService.extractSubject(#token), #spaceId)")
    public ResponseEntity<Void> deletePost(@PathVariable final Long spaceId,
                                           @PathVariable final Long postId,
                                           @RequestHeader(AUTHORIZATION) final String token) {

        postService.deletePost(postId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


    @Transactional
    @DeleteMapping("{spaceId}")
    @PreAuthorize("@userSpaceService.userIsCreatorInSpace(@jwtService.extractSubject(#token), #spaceId)")
    public ResponseEntity<Void> deleteSpace(@PathVariable final Long spaceId,
                                           @RequestHeader(AUTHORIZATION) final String token) {
        var email = jwtService.extractSubject(token);
        var user = userService.findByEmail(email);

        spaceService.deleteSpace(spaceId, user);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}


