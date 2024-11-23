package br.socialhub.api.dtos.post;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

import static br.socialhub.api.utils.Constantes.DATE_FORMAT_DD_MM_YYYY_HH_MM_SS;

public record PostUpdateDTO(
                            @NotBlank(message = "O título é obrigatório.")
                            String title,
                            @JsonFormat(pattern = DATE_FORMAT_DD_MM_YYYY_HH_MM_SS)
                            LocalDateTime scheduledDate,
                            @NotBlank(message = "A descrição é obrigatória.")
                            String description,
                            List<MultipartFile> files,
                            @NotNull(message = "Ao menos uma rede social é obrigatória.")
                            @Size(min = 1, message = "Ao menos uma rede social deve ser fornecida.")
                            List<Long> idSocialNetworks
) {
}
