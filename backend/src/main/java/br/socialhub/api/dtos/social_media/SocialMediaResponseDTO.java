package br.socialhub.api.dtos.social_media;

import br.socialhub.api.models.SocialNetwork;

public record SocialMediaResponseDTO(Long id, String name) {
    public SocialMediaResponseDTO(SocialNetwork socialNetwork){
        this(socialNetwork.getId(), socialNetwork.getDescricao().getDescription());
    }
}
