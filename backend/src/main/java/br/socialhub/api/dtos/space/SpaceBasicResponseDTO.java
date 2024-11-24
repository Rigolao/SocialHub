package br.socialhub.api.dtos.space;

import br.socialhub.api.dtos.social_media.SocialMediaResponseDTO;
import br.socialhub.api.enums.ActiveInactive;
import br.socialhub.api.enums.RoleType;
import br.socialhub.api.models.UsuarioSpace;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public record  SpaceBasicResponseDTO(Long id, String name, RoleType role, boolean isDefault, List<SocialMediaResponseDTO> connectedAccounts) {
    public SpaceBasicResponseDTO(UsuarioSpace userSpace){
        this(
                userSpace.getSpace().getId(),
                userSpace.getSpace().getName(),
                userSpace.getRole().getDescription(),
                userSpace.isDefault(),
                Optional.of(userSpace.getSpace())
                        .map(space -> Optional.ofNullable(space.getAccounts())
                                .orElse(List.of()).stream()
                                .filter(account -> account.getStatus() == ActiveInactive.ACTIVE)
                                .map(account -> new SocialMediaResponseDTO(account.getSocialNetwork()))
                                .collect(Collectors.toList()))
                        .orElse(List.of())
        );
    }
}
