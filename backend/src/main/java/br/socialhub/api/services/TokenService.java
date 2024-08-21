package br.socialhub.api.services;

import br.socialhub.api.enums.TokenStatus;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.TokenAuditoria;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.repositories.TokenAuditoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static br.socialhub.api.utils.Constantes.RESOURCE_USER;

@RequiredArgsConstructor
@Service
public class TokenService {
    private final TokenAuditoriaRepository tokenAuditoriaRepository;

    public boolean isTokenValid(final String token){
        var tokenAuditoria = tokenAuditoriaRepository.findValidToken(token);

        if(tokenAuditoria.isEmpty()){
            return false;
        }

        LocalDateTime endDate = tokenAuditoria.get().getDataFim();
        LocalDateTime startDate = tokenAuditoria.get().getDataInicio();
        LocalDateTime currentDate = LocalDateTime.now();

        return endDate.isAfter(currentDate) && startDate.isBefore(currentDate);
    }

    public Usuario getUserByToken(String token) {
        return tokenAuditoriaRepository.findById(token)
                .map(TokenAuditoria::getUsuario)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));
    }

    public void invalidateToken(String token) {
        var tokenAuditoria = tokenAuditoriaRepository.findById(token);

        tokenAuditoria.ifPresent(auditoria -> {
            auditoria.setStatus(TokenStatus.USED);
            tokenAuditoriaRepository.save(auditoria);
        });
    }
}
