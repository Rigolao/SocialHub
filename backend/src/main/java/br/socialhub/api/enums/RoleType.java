package br.socialhub.api.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RoleType {
    CREATOR("Criador"),
    VIEWER("Visualizador"),
    EDITOR("Editor");

    private final String description;
}
