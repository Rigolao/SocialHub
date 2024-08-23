package br.socialhub.api.handlers;

import br.socialhub.api.dtos.ErroDTO;
import br.socialhub.api.exceptions.*;
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
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErroDTO> handleResourceNotFoundException (ResourceNotFoundException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    @ExceptionHandler(MinimumAgeException.class)
    public ResponseEntity<ErroDTO> handleMinimumAge (MinimumAgeException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    @ExceptionHandler(InvalidDocumentException.class)
    public ResponseEntity<ErroDTO> handleDoncumentoInvalido (InvalidDocumentException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    @ExceptionHandler(PasswordMismatchException.class)
    public ResponseEntity<ErroDTO> handlePasswordMismatchException(PasswordMismatchException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<ErroDTO> handleUnauthorizedAccessException(UnauthorizedAccessException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(erro);
    }

    @ExceptionHandler(DocumentNumberNotUniqueException.class)
    public ResponseEntity<ErroDTO> handleDocumentNumberNotUniqueException(DocumentNumberNotUniqueException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(erro);
    }

    @ExceptionHandler(EmailNotUniqueException.class)
    public ResponseEntity<ErroDTO> handleEmailNotUniqueException(EmailNotUniqueException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(erro);
    }


}
