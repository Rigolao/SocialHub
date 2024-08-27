package br.socialhub.api.templates;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Arrays;

import static br.socialhub.api.utils.Constantes.*;

@Component
public class EmailTemplateLoader {
    public String loadWelcomeEmailTemplate(final String name) {
        try {
            ClassPathResource resource = new ClassPathResource(WELCOME_EMAIL_TEMPLATE_PATH);
            String content = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            return content.replace("{{name}}", name)
                    .replace("{{exploreLink}}", LINK_FRONT_END)
                    .replace("{{year}}", String.valueOf(LocalDate.now().getYear()));
        } catch (IOException e) {
            throw new RuntimeException("Erro ao carregar o template de e-mail", e);
        }
    }

    public String loadInviteSpaceTemplate(final String nameSpace, final String name, final String inviteeName, final String link) {
        try {
            ClassPathResource resource = new ClassPathResource(INVITE_EMAIL_TEMPLATE_PATH);
            String content = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            return content.replace("{{name}}", name)
                    .replace("{{inviterName}}", inviteeName)
                    .replace("{{spaceName}}", nameSpace)
                    .replace("{{invitationLink}}", link)
                    .replace("{{logoImageBase64}}", LOGO_BASE64)
                    .replace("{{year}}", String.valueOf(LocalDate.now().getYear()));
        } catch (IOException e) {
            throw new RuntimeException("Erro ao carregar o template de e-mail", e);
        }
    }
    public String loadResetPasswordTemplate(final String link, final String name) {
        try {
            ClassPathResource resource = new ClassPathResource(RESET_EMAIL_TEMPLATE_PATH);
            String content = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            return content.replace("{{resetLink}}", link)
                    .replace("{{name}}", name)
                    .replace("{{year}}", String.valueOf(LocalDate.now().getYear()));
        } catch (IOException e) {
            throw new RuntimeException("Erro ao carregar o template de e-mail", e);
        }
    }
}
