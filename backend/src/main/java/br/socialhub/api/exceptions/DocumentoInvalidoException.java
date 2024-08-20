package br.socialhub.api.exceptions;

public class DocumentoInvalidoException extends RuntimeException{
    public DocumentoInvalidoException(String msg){
        super(msg);
    }
}
