package br.socialhub.api.services;

import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.*;
import br.socialhub.api.repositories.TokenAuditoriaRepository;
import br.socialhub.api.repositories.TokenInviteRepository;
import br.socialhub.api.services.strategy.token_invite.InviteLinkGeneratioStrategy;
import br.socialhub.api.services.strategy.LinkGenerationStrategy;
import br.socialhub.api.services.strategy.token_reset_password.ResetLinkGenerationStrategy;
import br.socialhub.api.services.strategy.TokenValidationStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static br.socialhub.api.utils.Constantes.*;

@RequiredArgsConstructor
@Service
public class TokenService{
    private final TokenAuditoriaRepository tokenAuditoriaRepository;
    private final TokenInviteRepository tokenInviteRepository;

    public void validateToken(final String token, TokenValidationStrategy strategy){
        strategy.validate(token);
    }

    public Usuario getUserByToken(String token) {
        return tokenAuditoriaRepository.findById(token)
                .map(TokenAuditoria::getUser)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));
    }

    public String generateInviteLink(final Usuario user, final Space space, final Cargo role) {
        LinkGenerationStrategy strategy = new InviteLinkGeneratioStrategy(tokenInviteRepository,user,space,role);
        return strategy.generateLink();
    }

    public String generateResetLink(Usuario user) {
        LinkGenerationStrategy strategy = new ResetLinkGenerationStrategy(user,tokenAuditoriaRepository);
        return strategy.generateLink();
    }

    public TokenInvite findByIdInvite(final String token){
        return tokenInviteRepository.findById(token).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_TOKEN));
    }
}
