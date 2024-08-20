package br.socialhub.api.exceptions;

public class DocumentoInvalidoException extends RuntimeException{
    public DocumentoInvalidoException(String msg){
        super(String.format("O %s é invalido", msg));
    }
}
