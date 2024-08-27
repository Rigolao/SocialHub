package br.socialhub.api.services.strategy;

public interface TokenValidationStrategy {
    public void validate(final String token);
}
