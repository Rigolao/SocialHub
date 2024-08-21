package br.socialhub.api.exceptions;

public class InvalidDocumentException extends RuntimeException{
    public InvalidDocumentException(String msg){
        super(String.format("O %s é invalido", msg));
    }
}
