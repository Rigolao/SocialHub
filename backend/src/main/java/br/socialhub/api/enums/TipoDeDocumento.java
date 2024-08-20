package br.socialhub.api.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString(of = "descricao")
public enum TipoDeDocumento {
    CPF("CPF"),
    CNPJ("CNPJ");

    private final String descricao;
}
