package br.socialhub.api.dtos.space;

import br.socialhub.api.dtos.social_media.SocialMediaResponseDTO;
import br.socialhub.api.enums.RoleType;
import br.socialhub.api.models.UsuarioSpace;

import java.util.List;
import java.util.stream.Collectors;

public record  SpaceBasicResponseDTO(Long id, String name, RoleType role, List<SocialMediaResponseDTO> connectedAccounts) {
    public SpaceBasicResponseDTO(UsuarioSpace userSpace){
        this(
                userSpace.getSpace().getId(),
                userSpace.getSpace().getName(),
                userSpace.getRole().getDescription(),
                userSpace.getSpace().getAccounts().stream().map(account -> new SocialMediaResponseDTO(account.getSocialNetwork())).collect(Collectors.toList())
        );
    }
}
