package br.socialhub.api.services;

import br.socialhub.api.dtos.social_media.SocialMediaResponseDTO;
import br.socialhub.api.repositories.RedeSocialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SocialMediaService {
    private final RedeSocialRepository redeSocialRepository;
    public List<SocialMediaResponseDTO> getAll() {
        return redeSocialRepository.findAll().stream().map(SocialMediaResponseDTO::new).collect(Collectors.toList());
    }
}
