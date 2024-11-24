package br.socialhub.api.exceptions;

public class InvalidJsonException extends RuntimeException{
    public InvalidJsonException(){
        super("O token fornecido não é um JSON válido.");
    }
}
