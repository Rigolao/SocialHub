package br.socialhub.api.services;

import br.socialhub.api.dtos.user.UserResponseDTO;
import br.socialhub.api.exceptions.MinimumAgeException;
import br.socialhub.api.repositories.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static br.socialhub.api.common.UserConstant.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UsuarioRepository usuarioRepository;

//    @Test
//    public void createUser_WithValidData_ReturnsUser(){
//        when(usuarioRepository.save(USUARIO)).thenReturn(USUARIO);
//        when(passwordEncoder.encode(SENHA_DEFAULT)).thenReturn(SENHA_DEFAULT);
//
//        UserResponseDTO sut = userService.createUser(USUARIO_CREATED);
//
//        assertThat(sut).isEqualTo(USUARIO);
//    }
//
//    @Test
//    public void createUser_WithInvalidData_ThrowsException(){
//        assertThatThrownBy(() -> userService.createUser(INVALID_USUARIO_CREATED))
//                .isInstanceOf(MinimumAgeException.class) // Ou a exceção específica esperada
//                .hasMessageContaining("Idade mínima inválida: a idade permitida é a partir de 12 anos.");
//    }
}
