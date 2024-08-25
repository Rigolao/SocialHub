package br.socialhub.api.services;

import br.socialhub.api.templates.EmailTemplateLoader;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import static br.socialhub.api.utils.Constantes.*;

@Async
@RequiredArgsConstructor
@Service
@Slf4j
public class EmailService {
    private final JavaMailSender mailSender;
    private final EmailTemplateLoader emailTemplateLoader;

    public void sendPasswordResetEmail(final String email, final String resetLink) {
        String content = emailTemplateLoader.loadResetPasswordTemplate(resetLink);
        _sendHtmlEmail(email, RESET_PASSWORD_TITLE_EMAIL, content);
    }

    public void sendWelcomeEmail(final String email, final String name) {
        String content = emailTemplateLoader.loadWelcomeEmailTemplate(name);
        _sendHtmlEmail(email, WELCOME_SOCIAL_HUB_TITLE_EMAIL, content);
    }

    public void sendInviteUser(String spaceName, String inviteeName, String inviteeEmail, String nameCreator, String link) {
        String content = emailTemplateLoader.loadInviteSpaceTemplate(spaceName, inviteeName, nameCreator, link);
        _sendHtmlEmail(inviteeEmail, INVITE_USER_TITLE_EMAIL, content);
    }

    private void _sendHtmlEmail(String recipientEmail, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, UTF_8);

            helper.setTo(recipientEmail);
            helper.setSubject(subject);

            // Cria o multipart relacionado
            MimeMultipart multipart = new MimeMultipart("related");

            // Parte HTML
            MimeBodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(htmlContent, "text/html");
            multipart.addBodyPart(messageBodyPart);

            // Adiciona a imagem como parte inline, se necessário
            // Neste caso, se você estiver apenas usando base64 no HTML, você pode pular esta parte.
            // Se precisar de imagens adicionais inline, adicione-as aqui.

            // Define o conteúdo do e-mail
            message.setContent(multipart);

            mailSender.send(message);
            log.info("Email enviado com sucesso para {}", recipientEmail);
        } catch (MessagingException e) {
            log.warn("Falha ao enviar email para {}", recipientEmail);
        }
    }

}
