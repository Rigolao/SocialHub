package br.socialhub.api.exceptions;

public class RecursoNaoEncontradoException extends RuntimeException {
    public RecursoNaoEncontradoException(String recurso){
        super(String.format("%s não encontrado.", recurso));
    }
}
