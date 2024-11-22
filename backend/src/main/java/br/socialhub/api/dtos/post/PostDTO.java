package br.socialhub.api.dtos.post;

import br.socialhub.api.dtos.social_media.SocialMediaResponseDTO;

import java.time.LocalDateTime;
import java.util.List;

public record PostDTO (Long id, String title, LocalDateTime scheduledDate, List<SocialMediaResponseDTO> socialNetwork){

}
