package br.socialhub.api.handlers;

import br.socialhub.api.dtos.ErroDTO;
import br.socialhub.api.exceptions.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GeneralExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        StringBuilder errorMessages = new StringBuilder("Erros de validação: ");
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errorMessages.append(String.format("Campo '%s': %s;", fieldName, errorMessage));
        });

        // Criar o DTO de erro com as mensagens
        ErroDTO erro = new ErroDTO(errorMessages.toString());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(erro);

    }
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErroDTO> handleResourceNotFoundException (ResourceNotFoundException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    @ExceptionHandler(MinimumAgeException.class)
    public ResponseEntity<ErroDTO> handleMinimumAge (MinimumAgeException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    @ExceptionHandler(InvalidDocumentException.class)
    public ResponseEntity<ErroDTO> handleDoncumentoInvalido (InvalidDocumentException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    @ExceptionHandler(PasswordMismatchException.class)
    public ResponseEntity<ErroDTO> handlePasswordMismatchException(PasswordMismatchException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<ErroDTO> handleUnauthorizedAccessException(UnauthorizedAccessException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(erro);
    }

    @ExceptionHandler(DocumentNumberNotUniqueException.class)
    public ResponseEntity<ErroDTO> handleDocumentNumberNotUniqueException(DocumentNumberNotUniqueException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(erro);
    }

    @ExceptionHandler(EmailNotUniqueException.class)
    public ResponseEntity<ErroDTO> handleEmailNotUniqueException(EmailNotUniqueException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(erro);
    }

    @ExceptionHandler(RestrictedRoleException.class)
    public ResponseEntity<ErroDTO> handleRestrictedRoleException(RestrictedRoleException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(erro);
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ErroDTO> handleInvalidTokenException(InvalidTokenException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(erro);
    }
    @ExceptionHandler(UserAlreadyAssignedToSpaceException.class)
    public ResponseEntity<ErroDTO> handleInvalidTokenException(UserAlreadyAssignedToSpaceException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(erro);
    }

    @ExceptionHandler(UserNotFoundInSpaceException.class)
    public ResponseEntity<ErroDTO> handleUserNotFoundInSpaceException(UserNotFoundInSpaceException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(erro);
    }

    @ExceptionHandler(PostDateSchedulingException.class)
    public ResponseEntity<ErroDTO> handlePostDateSchedulingException(PostDateSchedulingException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(erro);
    }
    @ExceptionHandler(DefaultSpaceDeletionException.class)
    public ResponseEntity<ErroDTO> handleDefaultSpaceDeletionException(DefaultSpaceDeletionException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(erro);
    }

    @ExceptionHandler(InvalidJsonException.class)
    public ResponseEntity<ErroDTO> handleDefaultSpaceDeletionException(InvalidJsonException e){
        ErroDTO erro = new ErroDTO(e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(erro);
    }
}
