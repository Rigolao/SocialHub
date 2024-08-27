package br.socialhub.api.controllers;

import br.socialhub.api.services.TokenService;
import br.socialhub.api.services.UserSpaceService;
import br.socialhub.api.services.strategy.token_invite.InviteTokenValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

import static br.socialhub.api.utils.Constantes.ENDPOINT_INVITATIONS;
import static br.socialhub.api.utils.Constantes.LINK_INVITE_ACCEPT_FRONT_END;

@RequiredArgsConstructor
@RestController
@RequestMapping(ENDPOINT_INVITATIONS)
public class InvitationController {
    private final TokenService tokenService;
    private final UserSpaceService userSpaceService;
    private final InviteTokenValidation inviteTokenValidation;

    @Transactional
    @GetMapping
    public ResponseEntity<Void> confirmInvitation(@RequestParam final String token){
        tokenService.validateToken(token, inviteTokenValidation);

        var tokenInvite = tokenService.findByIdInvite(token);

        userSpaceService.assignRoleToUserInSpace(tokenInvite.getUser(), tokenInvite.getSpace(), tokenInvite.getRole());

        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(LINK_INVITE_ACCEPT_FRONT_END)).build();
    }
}
