package br.socialhub.api.exceptions;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String msg){
        super(msg);
    }
}
