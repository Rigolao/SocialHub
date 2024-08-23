package br.socialhub.api.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PlanType {
    FREE("Gratuito"),
    PREEMIUM("Preemium");

    private final String description;
}
