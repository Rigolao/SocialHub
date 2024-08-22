package br.socialhub.api.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString(of = "description")
public enum DocumentType {
    CPF("CPF"),
    CNPJ("CNPJ");

    private final String description;
}
