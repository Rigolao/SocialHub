package br.socialhub.api.exceptions;

import static br.socialhub.api.utils.Constantes.EXCEPTION_USER_ALREADY_ASSIGNED_TO_SPACE;

public class UserAlreadyAssignedToSpaceException extends RuntimeException{
    public UserAlreadyAssignedToSpaceException(){
        super(EXCEPTION_USER_ALREADY_ASSIGNED_TO_SPACE);
    }
}
