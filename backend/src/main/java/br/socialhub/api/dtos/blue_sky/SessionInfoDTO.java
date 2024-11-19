package br.socialhub.api.dtos.blue_sky;

public record SessionInfoDTO( String accessJwt,
                              String refreshJwt,
                              String handle,
                              String did,
                              boolean active,
                              String status) {
}
