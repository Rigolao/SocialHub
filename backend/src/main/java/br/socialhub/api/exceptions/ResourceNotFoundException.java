package br.socialhub.api.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String recurso){
        super(String.format("%s não encontrado.", recurso));
    }
}
