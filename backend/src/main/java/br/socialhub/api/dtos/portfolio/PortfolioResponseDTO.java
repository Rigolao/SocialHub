package br.socialhub.api.dtos.portfolio;

import br.socialhub.api.dtos.social_media.SocialInformationDTO;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

import static br.socialhub.api.utils.Constantes.LINK_URL_PHOTO;

public record PortfolioResponseDTO(String name, @JsonProperty("url_photo") String urlPhoto, List<SocialInformationDTO> socialNetworks) {
    public PortfolioResponseDTO(String nome, Long id, List<SocialInformationDTO> socialNetworks){
        this(nome, String.format(LINK_URL_PHOTO, id), socialNetworks);
    }
}
