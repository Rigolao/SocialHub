package br.socialhub.api.exceptions;

import static br.socialhub.api.utils.Constantes.EXCEPTION_PASSWORD_MISMATCH;

public class PasswordMismatchException extends RuntimeException {
    public PasswordMismatchException(){
        super(EXCEPTION_PASSWORD_MISMATCH);
    }
}
