package br.socialhub.api.services;

import br.socialhub.api.enums.RoleType;
import br.socialhub.api.enums.TokenStatus;
import br.socialhub.api.exceptions.InvalidTokenException;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.exceptions.RestrictedRoleException;
import br.socialhub.api.models.*;
import br.socialhub.api.repositories.TokenAuditoriaRepository;
import br.socialhub.api.repositories.TokenInviteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static br.socialhub.api.utils.Constantes.*;

@RequiredArgsConstructor
@Service
public class TokenService {
    private final TokenAuditoriaRepository tokenAuditoriaRepository;
    private final TokenInviteRepository tokenInviteRepository;

    public void validateToken(final String token){
        var tokenAuditoria = findByIdAuditoria(token);

        _validatePasswordChange(tokenAuditoria);

        tokenAuditoria.setStatus(TokenStatus.USED);
        tokenAuditoriaRepository.save(tokenAuditoria);
    }

    private void _validatePasswordChange(TokenAuditoria tokenAuditoria) {
        _validateTokenStatus(tokenAuditoria.getStatus());
        _validateTokenEndDate(tokenAuditoria.getEndDate());
    }

    public Usuario getUserByToken(String token) {
        return tokenAuditoriaRepository.findById(token)
                .map(TokenAuditoria::getUser)
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));
    }

    public void invalidateTokenAuditoria(String token) {
        var tokenAuditoria = findByIdAuditoria(token);

        _validateTokenAuditoria(tokenAuditoria);
    }

    private void _validateTokenAuditoria(TokenAuditoria tokenAuditoria) {
        _validateTokenStatus(tokenAuditoria.getStatus());
        _validateTokenEndDate(tokenAuditoria.getEndDate());
    }

    public String gerenateLinkInvite(final Usuario user, final Space space, final Cargo role) {
        _validateInviteRole(role);

        var tokenInvite = _createTokenInvite(user, space, role);

        return String.format(LINK_INVITE_USER, tokenInviteRepository.save(tokenInvite).getToken());
    }

    private void _validateInviteRole(Cargo role) {
        if(role.getDescription().equals(RoleType.CREATOR)){
            throw new RestrictedRoleException();
        }
    }

    private TokenInvite _createTokenInvite(final Usuario user, final Space space, final Cargo role){
        return new TokenInvite(user, space, role);
    }

    public TokenInvite findByIdInvite(final String token){
        return tokenInviteRepository.findById(token).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_TOKEN));
    }

    public TokenAuditoria findByIdAuditoria(final String toke){
        return tokenAuditoriaRepository.findById(toke).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_TOKEN));
    }

    public TokenInvite confirmInvitation(String token) {
        var tokenInvite = findByIdInvite(token);
        _validateTokenInvite(tokenInvite);
        tokenInvite.setStatus(TokenStatus.USED);

        return tokenInviteRepository.save(tokenInvite);
    }

    private void _validateTokenInvite(TokenInvite tokenInvite) {
        _validateTokenStatus(tokenInvite.getStatus());
        _validateTokenEndDate(tokenInvite.getEndDate());
    }

    public void _validateTokenStatus(TokenStatus tokenStatus){
        if(tokenStatus.equals(TokenStatus.USED)){
            throw new InvalidTokenException(EXCEPTION_INVALID_TOKEN_STATUS);
        }
    }

    public void _validateTokenEndDate(LocalDateTime endDate){
        if(endDate.isBefore(LocalDateTime.now())){
            throw new InvalidTokenException(EXCEPTION_INVALID_TOKEN_END_DATE);
        }
    }

    public String generateResetLink(Usuario user) {

        var tokenAuditoria = _createTokenAuditoria(user);
        var uuid =  tokenAuditoriaRepository.save(tokenAuditoria).getToken();

        return String.format(LINK_RESET, uuid);
    }

    private TokenAuditoria _createTokenAuditoria(Usuario user) {
        return new TokenAuditoria(user);
    }
}
