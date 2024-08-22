package br.socialhub.api.services;

import br.socialhub.api.dtos.security.AuthenticateResponseDTO;
import br.socialhub.api.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthenticationService {
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    public AuthenticateResponseDTO authenticate(Authentication authentication){
        var token =  jwtService.generateToken(authentication);
        var email = jwtService.extractSubject(token);
        var user = usuarioRepository.findByEmail(email).get();

       return new AuthenticateResponseDTO(token, user.getId());
    }
}
