package br.socialhub.api.dtos;

import br.socialhub.api.enums.TipoDeDocumento;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record UserCreateDTO(
        @NotBlank(message = "O campo nome é obrigatório")
        @Size(min = 2, max = 50, message = "O nome não pode ter mais de 50 caracteres.")
        String nome,

        @NotNull(message = "O campo data nascimento é obrigatório.")
        LocalDate dataNascimento,

        @NotBlank(message = "O campo numero documento é obrigatório.")
        @Size(max = 18, message = "O número do documento não pode ter mais de 12 caracteres.")
        String numeroDocumento,

        @NotNull(message = "O campo tipo de documento é obrigatório.")
        TipoDeDocumento tipoDeDocumento,

        @Email(message = "O campo email precisa ser válido.")
        @NotBlank(message = "O campo email é obrigatório.")
        String email,

        @NotBlank(message = "O campo senha é obrigatório.")
        @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres.")
        String senha) {
}
