package br.socialhub.api.exceptions;

import static br.socialhub.api.utils.Constantes.EXCEPTION_USER_NOT_FOUND_IN_SPACE;

public class UserNotFoundInSpaceException extends RuntimeException{
    public UserNotFoundInSpaceException(){
        super(EXCEPTION_USER_NOT_FOUND_IN_SPACE);
    }
}
