package br.socialhub.api.templates;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import static br.socialhub.api.utils.Constantes.WELCOME_EMAIL_TEMPLATE_PATH;

@Component
public class EmailTemplateLoader {
    public String loadWelcomeEmailTemplate(final String name) {
        try {
            ClassPathResource resource = new ClassPathResource(WELCOME_EMAIL_TEMPLATE_PATH);
            String content = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            return content.replace("{{nome}}", name);
        } catch (IOException e) {
            throw new RuntimeException("Erro ao carregar o template de e-mail", e);
        }
    }
}
