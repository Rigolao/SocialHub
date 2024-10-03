package br.socialhub.api.services;

import br.socialhub.api.dtos.SocialAccountDTO;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.Conta;
import br.socialhub.api.models.SocialNetwork;
import br.socialhub.api.models.Space;
import br.socialhub.api.repositories.AccountRepository;
import br.socialhub.api.repositories.SocialNetworkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static br.socialhub.api.utils.Constantes.RESOURCE_SOCIAL_NETWORK;

@RequiredArgsConstructor
@Service
public class SocialNetworkService {
    private final SocialNetworkRepository socialNetworkRepository;
    private final AccountRepository accountRepository;

    public SocialNetwork findById(final Long id){
        return socialNetworkRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_SOCIAL_NETWORK));
    }

    public void associateSocialAccount(Space space, SocialNetwork socialNetwork, SocialAccountDTO socialAccountDTO) {
        Conta account = new Conta(space, socialNetwork, socialAccountDTO.token());
        accountRepository.save(account);
    }
}
