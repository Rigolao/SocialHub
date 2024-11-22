package br.socialhub.api.dtos.post;

import br.socialhub.api.dtos.social_media.SocialMediaResponseDTO;
import br.socialhub.api.enums.PostStatus;

import java.time.LocalDateTime;
import java.util.List;

public record PostDTO (Long id, String title, LocalDateTime scheduledDate, PostStatus status, List<SocialMediaResponseDTO> socialNetwork){

}
