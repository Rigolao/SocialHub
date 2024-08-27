package br.socialhub.api.services.strategy.token_invite;

import br.socialhub.api.enums.TokenStatus;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.TokenInvite;
import br.socialhub.api.repositories.TokenInviteRepository;
import br.socialhub.api.services.strategy.abstracts.AbsctractValidatorToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static br.socialhub.api.utils.Constantes.RESOURCE_TOKEN;

@RequiredArgsConstructor
@Service
public class InviteTokenValidation extends AbsctractValidatorToken<TokenInvite> {
    private final TokenInviteRepository tokenInviteRepository;
    @Override
    public TokenInvite findById(String token) {
        return tokenInviteRepository.findById(token).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_TOKEN));
    }

    @Override
    protected TokenStatus getTokenStatus(TokenInvite tokenEntity) {
        return tokenEntity.getStatus();
    }

    @Override
    protected LocalDateTime getTokenEndDate(TokenInvite tokenEntity) {
        return tokenEntity.getEndDate();
    }

    @Override
    protected void updateTokenStatus(TokenInvite tokenEntity) {
        tokenEntity.setStatus(TokenStatus.UNUSED);
        tokenInviteRepository.save(tokenEntity);
    }
}
