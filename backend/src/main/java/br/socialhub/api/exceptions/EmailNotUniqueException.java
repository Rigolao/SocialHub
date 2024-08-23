package br.socialhub.api.exceptions;

import static br.socialhub.api.utils.Constantes.EXCEPTION_EMAIL_NOT_UNIQUE;

public class EmailNotUniqueException extends RuntimeException {
    public EmailNotUniqueException(){
        super(EXCEPTION_EMAIL_NOT_UNIQUE);
    }
}
