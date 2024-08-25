package br.socialhub.api.exceptions;

import static br.socialhub.api.utils.Constantes.EXCEPTION_RESTRICTED_ROLE;

public class RestrictedRoleException extends RuntimeException{
    public RestrictedRoleException (){
        super(EXCEPTION_RESTRICTED_ROLE);
    }
}
