package br.socialhub.api.dtos.account;


public record AccountRequestDTO (String token){
    @Override
    public String toString() {
        return String.format("{\"refreshJwt\":\"%s\"}", token);
    }
}
