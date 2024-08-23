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
    String ENDPOINT_SPACE = "spaces";

    /**
     *  Recursos
     */

    String RESOURCE_USER = "Usuário";
    String RESOURCE_SPACE = "Space";
    String RESOURCE_PLAN = "Plano";
    String NAME_DEFAULT_SPACE = "Space 1";

    /**
     * JWT AUTH
     */

    String BEARER = "Bearer ";

    /**
     * Header request
     */

    String AUTHORIZATION = "Authorization";

    /**
     *  Utilitários
     */

    String WHITESPACE = " ";
    String UTF_8 = "UTF-8";
    String DATE_FORMAT_DD_MM_YYYY = "dd/MM/yyyy";

    /**
     * Links
     */

    String LINK_RESET = "http://localhost:5173/esqueci-minha-senha?token=%s";
    String LINK_URL_PHOTO = "http://localhost:8080/"+ENDPOINT_USERS+"/%s/photo";
    String LINK_FRONT_END = "https://localhost:5173";

    /**
     * Mensagem jakarta validation
     */

    String VALIDATION_REQUIRED_NAME = "O campo nome é obrigatório.";
    String VALIDATION_REQUIRED_BIRTH_DATE = "O campo data nascimento é obrigatório.";
    String VALIDATION_REQUIRED_DOCUMENT_NUMBER = "O campo numero de documento é obrigatório.";
    String VALIDATION_REQUIRED_DOCUMENT_TYPE = "O campo tipo de documento é obrigatório.";
    String VALIDATION_REQUIRED_EMAIL = "O campo email é obrigatório.";
    String VALIDATION_REQUIRED_PASSWORD = "O campo senha é obrigatório.";
    String VALIDATION_REQUIRED_NEW_PASSWORD = "O campo nova senha é obrigatório.";
    String VALIDATION_REQUIRED_CONFIRM_PASSWORD = "O campo confirma senha é obrigatório.";
    String VALIDATION_REQUIRED_TOKEN = "O campo token é obrigatório.";
    String VALIDATION_REQUIRED_PLAN = "O campo plano é obrigatório";
    String VALIDATION_EMAIL = "O campo email precisa ser válido.";


    String VALIDATION_SIZE_NAME = "O nome não pode ter mais de 50 caracteres.";
    String VALIDATION_SIZE_DOCUMENT_NUMBER = "O número do documento não pode ter mais de 18 caracteres.";
    String VALIDATION_SIZE_PASSWORD = "A senha deve ter pelo menos 6 caracteres.";


    /**
     *  Mensagem retorno endpoint
     */

    String MESSAGE_SUCESS_FORGOT = "Link para resetar senha enviado com sucesso.";
    String MESSAGE_SUCESS_RESET = "Senha atualizado com sucesso.";

    String MESSAGE_SUCESS_UPLOAD_PHOTO = "Foto enviada com sucesso.";

    String MESSAGE_BAD_REQUEST_RESET = "Token inválido. Por favor, solicite um novo link para resetar a senha.";

    /**
     * Exception messages
     */

    String EXCEPTION_PASSWORD_MISMATCH = "As senhas não coincidem.";
    String EXCEPTION_UNAUTHORIZED_RESOURCE = "O usuário não tem permissão para acessar esse recurso.";
    String EXCEPTION_UNAUTHORIZED = "O usuário não autorizado.";
    String EXCEPTION_DOCUMENT_NUMBER_NOT_UNIQUE_EXCEPTION = "O número de documento fornecido já está em uso. Por favor, use um número diferente.";
    String EXCEPTION_EMAIL_NOT_UNIQUE = "O e-mail fornecido já está registrado. Por favor, insira um e-mail diferente.";

    /**
     * Html template
     */

    String WELCOME_SOCIAL_HUB = "Bem-vindo ao SocialHub!";
    String WELCOME_EMAIL_TEMPLATE_PATH = "templates/welcome_email.html";

}
