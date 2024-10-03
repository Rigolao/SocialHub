package br.socialhub.api.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum SocialNetworkType {
    FACEBOOK("Facebook"),
    X("X"),
    INSTAGRAM("Instagram");

    private final String description;
}
