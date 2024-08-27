package br.socialhub.api.services.strategy.token_reset_password;

import br.socialhub.api.enums.TokenStatus;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.TokenAuditoria;
import br.socialhub.api.repositories.TokenAuditoriaRepository;
import br.socialhub.api.services.strategy.abstracts.AbsctractValidatorToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static br.socialhub.api.utils.Constantes.RESOURCE_TOKEN;

@RequiredArgsConstructor
@Service
public class ResetPasswordTokenValidation extends AbsctractValidatorToken<TokenAuditoria> {
    private final TokenAuditoriaRepository tokenAuditoriaRepository;
    @Override
    public TokenAuditoria findById(String token) {
        return tokenAuditoriaRepository.findById(token).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_TOKEN));
    }

    @Override
    protected TokenStatus getTokenStatus(TokenAuditoria tokenEntity) {
        return tokenEntity.getStatus();
    }

    @Override
    protected LocalDateTime getTokenEndDate(TokenAuditoria tokenEntity) {
        return tokenEntity.getEndDate();
    }

    @Override
    protected void updateTokenStatus(TokenAuditoria tokenEntity) {
        tokenEntity.setStatus(TokenStatus.UNUSED);
        tokenAuditoriaRepository.save(tokenEntity);
    }
}
