package br.socialhub.api.services;

import br.socialhub.api.exceptions.UnauthorizedAccessException;
import br.socialhub.api.infra.UserAuthenticated;
import br.socialhub.api.repositories.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static br.socialhub.api.utils.Constantes.EXCEPTION_UNAUTHORIZED;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UsuarioRepository usuarioRepository;

    public UserDetailsServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(email)
                .map(UserAuthenticated::new)
                .orElseThrow(() -> new UnauthorizedAccessException(EXCEPTION_UNAUTHORIZED));
    }
}
