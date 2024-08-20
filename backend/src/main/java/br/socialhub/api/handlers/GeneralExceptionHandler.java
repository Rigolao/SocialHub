package br.socialhub.api.handlers;

import br.socialhub.api.dtos.ErroDTO;
import br.socialhub.api.exceptions.DocumentoInvalidoException;
import br.socialhub.api.exceptions.MinimumAgeException;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GeneralExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return super.handleMethodArgumentNotValid(ex, headers, HttpStatus.UNPROCESSABLE_ENTITY, request);
    }

    @ExceptionHandler
    public ResponseEntity<ErroDTO> handleRecursoNaoEncontrado (ResourceNotFoundException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    @ExceptionHandler
    public ResponseEntity<ErroDTO> handleIdadeMinima (MinimumAgeException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    @ExceptionHandler(DocumentoInvalidoException.class)
    public ResponseEntity<ErroDTO> handleDoncumentoInvalido (DocumentoInvalidoException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

}
