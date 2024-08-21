package br.socialhub.api.exceptions;

public class MinimumAgeException extends RuntimeException {
    public MinimumAgeException(){
        super("Idade mínima inválida: a idade permitida é a partir de 12 anos.");
    }
}
