package br.socialhub.api.common;

import br.socialhub.api.dtos.user.UserCreateDTO;
import br.socialhub.api.enums.DocumentType;
import br.socialhub.api.models.Usuario;

import java.time.LocalDate;

public class UserConstant {
    public static final String SENHA_DEFAULT = "joao123";
    public static final UserCreateDTO USUARIO_CREATED = new UserCreateDTO("João",LocalDate.of(1999,6,7), "45176048884", DocumentType.CPF, "joao@email.com", SENHA_DEFAULT);
    public static final UserCreateDTO INVALID_USUARIO_CREATED = new UserCreateDTO("", LocalDate.of(2022,8, 20), "", DocumentType.CPF, "", SENHA_DEFAULT);
    public static final Usuario INVALID_USUARIO = new Usuario(null, "", "",  DocumentType.CPF, "", "", LocalDate.of(2022, 8, 20));
    public static final Usuario USUARIO = new Usuario(null, "João", "45176048884", DocumentType.CPF, "joao@email.br", "joao123",LocalDate.of(1999,6,7));

}
