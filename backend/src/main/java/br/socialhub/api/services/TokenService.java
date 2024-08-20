package br.socialhub.api.services;

import br.socialhub.api.enums.TokenStatus;
import br.socialhub.api.exceptions.RecursoNaoEncontradoException;
import br.socialhub.api.models.TokenAuditoria;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.repositories.TokenAuditoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class TokenService {
    private final TokenAuditoriaRepository tokenAuditoriaRepository;

    public boolean isTokenValid(final String token){
        var tokenAuditoria = tokenAuditoriaRepository.findValidToken(token);

        if(tokenAuditoria.isEmpty()){
            return false;
        }

        LocalDateTime dataFim = tokenAuditoria.get().getDataFim();
        LocalDateTime dataInicio = tokenAuditoria.get().getDataInicio();
        LocalDateTime dataAtual = LocalDateTime.now();

        return dataFim.isAfter(dataAtual) && dataInicio.isBefore(dataAtual);
    }

    public Usuario getUserByToken(String token) {
        return tokenAuditoriaRepository.findById(token)
                .map(TokenAuditoria::getUsuario)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuario"));
    }

    public void invalidarToken(String token) {
        var tokenAuditoria = tokenAuditoriaRepository.findById(token);

        tokenAuditoria.ifPresent(auditoria -> {
            auditoria.setStatus(TokenStatus.USED);
            tokenAuditoriaRepository.save(auditoria);
        });
    }
}
