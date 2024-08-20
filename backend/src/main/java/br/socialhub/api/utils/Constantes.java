package br.socialhub.api.utils;

public interface Constantes {

    /**
     * Mapeamento de todos endpoint
     */
    String ENDPOINT_PASSWORD = "passwords";
    String ENDPOINT_AUTHENTICATE = "authenticate";
    String ENDPOINT_USERS = "users";
    String ENDPOINT_FORGOT = "forgot";
    String ENDPOINT_RESET = "reset";
    String ENDPOINT_SWAGGER = "swagger-ui/index.html";

    /**
     *  Recursos
     */

    String RESOURCE_USER = "Usuário";
    String RESOURCE_EMAIL = "Email";


    /**
     * Links
     */

    String LINK_RESET = "http://localhost:5173/esqueci-minha-senha?token=%s";

    /**
     * Mensagem jakarta validation
     */

    String VALIDATION_REQUIRED_NAME = "O campo nome é obrigatório.";
    String VALIDATION_REQUIRED_BIRTH_DATE = "O campo data nascimento é obrigatório.";
    String VALIDATION_REQUIRED_DOCUMENT_NUMBER = "O campo numero de documento é obrigatório.";
    String VALIDATION_REQUIRED_DOCUMENT_TYPE = "O campo tipo de documento é obrigatório.";
    String VALIDATION_REQUIRED_EMAIL = "O campo email é obrigatório.";
    String VALIDATION_REQUIRED_PASSWORD = "O campo senha é obrigatório.";


    String VALIDATION_EMAIL = "O campo email precisa ser válido.";


    String VALIDATION_SIZE_NAME = "O nome não pode ter mais de 50 caracteres.";
    String VALIDATION_SIZE_DOCUMENT_NUMBER = "O número do documento não pode ter mais de 18 caracteres.";
    String VALIDATION_SIZE_PASSWORD = "A senha deve ter pelo menos 6 caracteres.";


}
