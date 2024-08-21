package br.socialhub.api.services;

import br.socialhub.api.templates.EmailTemplateLoader;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

import static br.socialhub.api.utils.Constantes.UTF_8;
import static br.socialhub.api.utils.Constantes.WELCOME_SOCIAL_HUB;

@Async
@RequiredArgsConstructor
@Service
@Slf4j
public class EmailService {
    private final JavaMailSender mailSender;
    private final EmailTemplateLoader emailTemplateLoader;

    public void sendPasswordResetEmail(final String email, final String resetLink){
        String subject = "Password Reset Request";
        String message = "You requested a password reset. Click the link below to reset your password:\n" + resetLink;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        mailSender.send(mailMessage);
    }

    public void sendWelcomeEmail(final String email, final String name) {
        String content = emailTemplateLoader.loadWelcomeEmailTemplate(name);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, UTF_8);

            helper.setTo(email);
            helper.setSubject(WELCOME_SOCIAL_HUB);
            helper.setText(content, true);

            mailSender.send(message);
        } catch (MessagingException e){
            log.warn("Email de boas vindas falhou para {}", email);
        }
        log.info("Email de boas vindas enviado com sucesso para {}", email);
    }

}
