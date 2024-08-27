package br.socialhub.api.services.strategy.token_invite;

import br.socialhub.api.enums.RoleType;
import br.socialhub.api.exceptions.RestrictedRoleException;
import br.socialhub.api.models.Cargo;
import br.socialhub.api.models.Space;
import br.socialhub.api.models.TokenInvite;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.repositories.TokenInviteRepository;
import br.socialhub.api.services.strategy.LinkGenerationStrategy;
import lombok.RequiredArgsConstructor;

import static br.socialhub.api.utils.Constantes.LINK_INVITE_USER;

@RequiredArgsConstructor
public class InviteLinkGeneratioStrategy implements LinkGenerationStrategy {
    private final TokenInviteRepository tokenInviteRepository;
    private final Usuario user;
    private final Space space;
    private final Cargo role;

    @Override
    public String generateLink() {
        _validateInviteRole(role);
        var tokenInvite = new TokenInvite(user,space,role);
        var uuid = tokenInviteRepository.save(tokenInvite).getToken();

        return String.format(LINK_INVITE_USER,uuid);

    }

    private void _validateInviteRole(Cargo role) {
        if (role.getDescription().equals(RoleType.CREATOR)) {
            throw new RestrictedRoleException();
        }
    }
}
