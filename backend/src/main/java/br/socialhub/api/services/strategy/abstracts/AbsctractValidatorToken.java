package br.socialhub.api.services.strategy.abstracts;

import br.socialhub.api.enums.TokenStatus;
import br.socialhub.api.exceptions.InvalidTokenException;
import br.socialhub.api.services.strategy.TokenValidationStrategy;

import java.time.LocalDateTime;

import static br.socialhub.api.utils.Constantes.EXCEPTION_INVALID_TOKEN_END_DATE;
import static br.socialhub.api.utils.Constantes.EXCEPTION_INVALID_TOKEN_STATUS;

public abstract class AbsctractValidatorToken<T> implements TokenValidationStrategy {
    public abstract T findById (final String token);

    @Override
    public void validate(final String token){
        T tokenEntity = findById(token);

        validateToken(tokenEntity);
        updateTokenStatus(tokenEntity);
    }

    public void validateToken(T tokenEntity){
        validateTokenStatus(getTokenStatus(tokenEntity));
        validateTokenEndDate(getTokenEndDate(tokenEntity));
    }

    public void validateTokenStatus(TokenStatus tokenStatus){
        if (tokenStatus.equals(TokenStatus.USED)) {
            throw new InvalidTokenException(EXCEPTION_INVALID_TOKEN_STATUS);
        }
    }

    protected void validateTokenEndDate(LocalDateTime endDate) {
        if (endDate.isBefore(LocalDateTime.now())) {
            throw new InvalidTokenException(EXCEPTION_INVALID_TOKEN_END_DATE);
        }
    }

    protected abstract TokenStatus getTokenStatus(T tokenEntity);
    protected abstract LocalDateTime getTokenEndDate(T tokenEntity);
    protected abstract void updateTokenStatus(T tokenEntity);
}
