package br.socialhub.api.dtos.social_media;

import br.socialhub.api.models.RedeSocial;

public record SocialMediaResponseDTO(Long id, String name) {
    public SocialMediaResponseDTO(RedeSocial redeSocial){
        this(redeSocial.getId(), redeSocial.getDescricao().getDescription());
    }
}
