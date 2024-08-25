package br.socialhub.api.controllers;

import br.socialhub.api.services.TokenService;
import br.socialhub.api.services.UserSpaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import static br.socialhub.api.utils.Constantes.ENDPOINT_INVITATIONS;

@RequiredArgsConstructor
@RestController
@RequestMapping(ENDPOINT_INVITATIONS)
public class InvitationController {
    private final TokenService tokenService;
    private final UserSpaceService userSpaceService;

    @Transactional
    @PostMapping
    public ResponseEntity<Void> confirmInvitation(@RequestParam final String token){
        var tokenInvite = tokenService.confirmInvitation(token);

        userSpaceService.assignRoleToUserInSpace(tokenInvite.getUser(), tokenInvite.getSpace(), tokenInvite.getRole());

        return ResponseEntity.ok().build();
    }
}
