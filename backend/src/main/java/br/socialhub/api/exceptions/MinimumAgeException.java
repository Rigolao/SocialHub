package br.socialhub.api.exceptions;

import static br.socialhub.api.utils.Constantes.EXCEPTION_MINIMUM_AGE;

public class MinimumAgeException extends RuntimeException {
    public MinimumAgeException(){
        super(EXCEPTION_MINIMUM_AGE);
    }
}
