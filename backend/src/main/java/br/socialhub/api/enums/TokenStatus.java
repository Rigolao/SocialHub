package br.socialhub.api.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString(of = "value")
public enum TokenStatus {
    USED("SIM"),
    UNUSED("NAO");

    private final String value;
}
