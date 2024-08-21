package br.socialhub.api.services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

import static br.socialhub.api.utils.Constantes.WHITESPACE;


@Service
public class JwtService {
    private final JwtEncoder encoder;
    private final JwtDecoder decoder;
    private static final String ISSUER = "socialhub";

    public JwtService(JwtEncoder encoder, JwtDecoder decoder) {
        this.encoder = encoder;
        this.decoder = decoder;
    }

    public String generateToken(Authentication authentication){
        Instant now = Instant.now();
        long expiry = 3600L;

        String scopes = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(WHITESPACE));

        var claims = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(authentication.getName())
                .claim("scope", scopes)
                .build();

        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

    }

    public String extractSubject(String token) {
        try {
            Jwt jwt = decoder.decode(token);
            return jwt.getSubject();
        } catch (JwtException e) {
            // Trate a exceção conforme necessário
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwt jwt = decoder.decode(token);
            Instant now = Instant.now();

            // Verifica se o token está expirado
            return jwt.getExpiresAt() == null || !jwt.getExpiresAt().isBefore(now);

        } catch (JwtException e) {

            return false;
        }
    }
}
