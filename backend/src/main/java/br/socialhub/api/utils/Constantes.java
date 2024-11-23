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
    String ENDPOINT_ANEXOS = "anexos";
    String ENDPOINT_SOCIAL_MEDIA="social-medias";

    String ENDPOINT_ROLE = "roles";
    String ENDPOINT_INVITATIONS = "invitations";

    /**
     *  Recursos
     */

    String RESOURCE_USER = "Usuário";
    String RESOURCE_SPACE = "Space";
    String RESOURCE_PLAN = "Plano";
    String RESOURCE_ROLE = "Cargo";
    String RESOURCE_TOKEN = "Token";
    String RESOURCE_POST = "Post";

    String RESOURCE_SOCIAL_NETWORK = "Rede social";



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

    String DATE_FORMAT_DD_MM_YYYY_HH_MM_SS = "dd/MM/yyyy HH:mm:ss";
    int ONE_DAY  = 1;

    /**
     * Links
     */

    String LINK_FRONT_END = "https://localhost:5173";
    String LINK_INVITE_ACCEPT_FRONT_END = LINK_FRONT_END+"/convite-aceito";
    String LINK_RESET = LINK_FRONT_END+"/esqueci-minha-senha?token=%s";
    String LINK_URL_PHOTO = "http://localhost:8080/"+ENDPOINT_USERS+"/%s/photo";
    String LINK_URL_ANEXOS = "http://localhost:8080/"+ENDPOINT_ANEXOS+"/%s";
    String LINK_INVITE_USER = "http://localhost:8080/invitations?token=%s";
    String LINK_BLUESKY = "https://bsky.social/xrpc";

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
    String EXCEPTION_PASSWORD_MISMATCH_OLD_PASSWORD = "A senha atual fornecida está incorreta. Por favor, verifique sua senha e tente novamente.";
    String EXCEPTION_UNAUTHORIZED_RESOURCE = "O usuário não tem permissão para acessar esse recurso.";
    String EXCEPTION_UNAUTHORIZED = "O usuário não autorizado.";
    String EXCEPTION_MINIMUM_AGE = "Idade mínima inválida: a idade permitida é a partir de 12 anos.";
    String EXCEPTION_DOCUMENT_NUMBER_NOT_UNIQUE_EXCEPTION = "O número de documento fornecido já está em uso. Por favor, use um número diferente.";
    String EXCEPTION_EMAIL_NOT_UNIQUE = "O e-mail fornecido já está registrado. Por favor, insira um e-mail diferente.";
    String EXCEPTION_RESTRICTED_ROLE = "Não é permitido atribuir o papel de 'CREATOR' a este espaço.";
    String EXCEPTION_INVALID_TOKEN_STATUS = "O token fornecido já foi utilizado e não é mais válido.";
    String EXCEPTION_INVALID_TOKEN_END_DATE = "O token fornecido expirou e não pode mais ser utilizado." ;
    String EXCEPTION_USER_ALREADY_ASSIGNED_TO_SPACE = "O usuário não está associado a este espaço." ;
    String EXCEPTION_USER_NOT_FOUND_IN_SPACE = "O Usuário não encontrado no espaço." ;

    /**
     * Html template
     */

    String WELCOME_SOCIAL_HUB_TITLE_EMAIL = "Bem-vindo ao SocialHub!";
    String INVITE_USER_TITLE_EMAIL = "Convite para participar do space 🥳";
    String RESET_PASSWORD_TITLE_EMAIL = "Redefina sua senha do SocialHub";
    String WELCOME_EMAIL_TEMPLATE_PATH = "templates/welcome_email.html";
    String INVITE_EMAIL_TEMPLATE_PATH = "templates/invite_space.html";
    String RESET_EMAIL_TEMPLATE_PATH = "templates/reset_password.html";

    String LOGO_BASE64 = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIGZpbGw9IiMwMDAwMDAiIHdpZHRoPSIyMDBweCIgaGVpZ2h0PSIyMDBweCIgdmlld0JveD0iMCAwIDMyIDMyIiBpZD0iaWNvbiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6bm9uZTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPm1hYy1jb21tYW5kPC90aXRsZT48cGF0aCBkPSJNMjQsMTNhNCw0LDAsMCwwLDQtNFY4YTQsNCwwLDAsMC00LTRIMjNhNCw0LDAsMCwwLTQsNHYzSDEzVjhBNCw0LDAsMCwwLDksNEg4QTQsNCwwLDAsMCw0LDhWOWE0LDQsMCwwLDAsNCw0aDN2Nkg4YTQsNCwwLDAsMC00LDR2MWE0LDQsMCwwLDAsNCw0SDlhNCw0LDAsMCwwLDQtNFYyMWg2djNhNCw0LDAsMCwwLDQsNGgxYTQsNCwwLDAsMCw0LTRWMjNhNCw0LDAsMCwwLTQtNEgyMVYxM1pNMjEsOGEyLDIsMCwwLDEsMi0yaDFhMiwyLDAsMCwxLDIsMlY5YTIsMiwwLDAsMS0yLDJIMjFaTTgsMTFBMiwyLDAsMCwxLDYsOVY4QTIsMiwwLDAsMSw4LDZIOWEyLDIsMCwwLDEsMiwydjNIOFptMywxM2EyLDIsMCwwLDEtMiwySDhhMiwyLDAsMCwxLTItMlYyM2EyLDIsMCwwLDEsMi0yaDNabTgtNUgxM1YxM2g2Wm0yLDJoM2EyLDIsMCwwLDEsMiwydjFhMiwyLDAsMCwxLTIsMkgyM2EyLDIsMCwwLDEtMi0yWiIvPjxyZWN0IGlkPSJfVHJhbnNwYXJlbnRfUmVjdGFuZ2xlXyIgZGF0YS1uYW1lPSImbHQ7VHJhbnNwYXJlbnQgUmVjdGFuZ2xlJmd0OyIgY2xhc3M9ImNscy0xIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiLz48L3N2Zz4=";

}
