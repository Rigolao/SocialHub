package br.socialhub.api.services.strategy.token_reset_password;

import br.socialhub.api.models.TokenAuditoria;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.repositories.TokenAuditoriaRepository;
import br.socialhub.api.services.strategy.LinkGenerationStrategy;
import lombok.RequiredArgsConstructor;

import static br.socialhub.api.utils.Constantes.LINK_RESET;


@RequiredArgsConstructor
public class ResetLinkGenerationStrategy implements LinkGenerationStrategy {
    private final Usuario user;
    private final TokenAuditoriaRepository tokenAuditoriaRepository;

    @Override
    public String generateLink() {
        var tokenAuditoria = new TokenAuditoria(user);
        var uuid = tokenAuditoriaRepository.save(tokenAuditoria).getToken();

        return String.format(LINK_RESET, uuid);
    }
}
