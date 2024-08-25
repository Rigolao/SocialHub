package br.socialhub.api.exceptions;

public class PasswordMismatchException extends RuntimeException {
    public PasswordMismatchException(String msg){
        super(msg);
    }
}
