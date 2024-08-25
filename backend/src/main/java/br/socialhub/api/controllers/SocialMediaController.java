package br.socialhub.api.controllers;

import br.socialhub.api.dtos.social_media.SocialMediaResponseDTO;
import br.socialhub.api.services.SocialMediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static br.socialhub.api.utils.Constantes.ENDPOINT_SOCIAL_MEDIA;

@RequiredArgsConstructor
@RestController
@RequestMapping(ENDPOINT_SOCIAL_MEDIA)
public class SocialMediaController {
    private final SocialMediaService socialMediaService;


    @GetMapping
    public ResponseEntity<List<SocialMediaResponseDTO>> getAll(){
        return ResponseEntity.ok(socialMediaService.getAll());
    }

}
