package br.socialhub.api.exceptions;

import static br.socialhub.api.utils.Constantes.EXCEPTION_DOCUMENT_NUMBER_NOT_UNIQUE_EXCEPTION;

public class DocumentNumberNotUniqueException extends RuntimeException{
    public DocumentNumberNotUniqueException(){
        super(EXCEPTION_DOCUMENT_NUMBER_NOT_UNIQUE_EXCEPTION);
    }
}
