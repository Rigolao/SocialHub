package br.socialhub.api.dtos.blue_sky;

public record CreateSessionResponseDTO(String accessJwt,
                                       String refreshJwt,
                                       String handle,
                                       String did,
                                       String email,
                                       boolean emailConfirmed,
                                       boolean emailAuthFactor,
                                       boolean active
                                       ) {
}
