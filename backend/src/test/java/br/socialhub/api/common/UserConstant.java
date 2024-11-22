package br.socialhub.api.common;

import br.socialhub.api.dtos.plan.PlanDTO;
import br.socialhub.api.dtos.user.UserCreateDTO;
import br.socialhub.api.enums.DocumentType;
import br.socialhub.api.models.Usuario;

import java.math.BigDecimal;
import java.time.LocalDate;

public class UserConstant {
    public static final String SENHA_DEFAULT = "joao123";

    // Plan Example
    public static final PlanDTO DEFAULT_PLAN = new PlanDTO(
            1L,                                  // id
            BigDecimal.valueOf(99.99),           // value
            LocalDate.of(2024, 1, 1),            // startDate
            LocalDate.of(2024, 12, 31)           // endDate
    );

    // Valid User Example
    public static final UserCreateDTO USUARIO_CREATED = new UserCreateDTO(
            "João",                             // name
            LocalDate.of(1999, 6, 7),           // birthDate
            "45176048884",                      // documentNumber
            DocumentType.CPF,                   // documentType
            "joao@email.com",                   // email
            SENHA_DEFAULT,                      // password
            SENHA_DEFAULT,                      // confirmPassword
            DEFAULT_PLAN                        // plan
    );

    // Invalid User Example
    public static final UserCreateDTO INVALID_USUARIO_CREATED = new UserCreateDTO(
            "",                                 // name
            LocalDate.of(2022, 8, 20),         // birthDate
            "",                                // documentNumber
            DocumentType.CPF,                  // documentType
            "",                                // email
            SENHA_DEFAULT,                     // password
            SENHA_DEFAULT,                     // confirmPassword
            new PlanDTO(                       // Invalid plan
                    null,
                    BigDecimal.ZERO,
                    LocalDate.now(),
                    null
            )
    );

    public static final Usuario INVALID_USUARIO = new Usuario(
            null, "", "", DocumentType.CPF, "", "", LocalDate.of(2022, 8, 20)
    );

    public static final Usuario USUARIO = new Usuario(
            null, "João", "45176048884", DocumentType.CPF, "joao@email.br", "joao123", LocalDate.of(1999, 6, 7)
    );
}
