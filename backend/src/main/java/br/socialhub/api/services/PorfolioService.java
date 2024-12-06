package br.socialhub.api.services;

import br.socialhub.api.dtos.blue_sky.InformationProfileDTO;
import br.socialhub.api.dtos.portfolio.PortfolioResponseDTO;
import br.socialhub.api.dtos.social_media.SocialInformationDTO;
import br.socialhub.api.enums.ActiveInactive;
import br.socialhub.api.models.Conta;
import br.socialhub.api.models.Space;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.models.UsuarioSpace;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PorfolioService {

    private final BlueSkyService blueSkyService;

    public PortfolioResponseDTO getPorfolio(Usuario user) {
         List<Conta> accounts = user.getUsuarioSpaces().stream()
                 .filter(UsuarioSpace::isDefault)
                 .map(UsuarioSpace::getSpace)
                 .map(Space::getAccounts)
                 .flatMap(List::stream)
                 .filter(account -> account.getStatus() == ActiveInactive.ACTIVE)
                 .toList();

        return new PortfolioResponseDTO(user.getName(), user.getId(), _preencherInformation(accounts));
    }

    private List<SocialInformationDTO> _preencherInformation(List<Conta> accounts) {
        if(accounts.isEmpty()){
            return new ArrayList<>();
        }

        List<SocialInformationDTO> socialInformationDTOS = new ArrayList<>();
        for (Conta account : accounts) {
            InformationProfileDTO information = blueSkyService.getProfile(account);
            SocialInformationDTO socialInformation  = new SocialInformationDTO(account.getSocialNetwork().getNome(), information.handle(), information.followersCount());
            socialInformationDTOS.add(socialInformation);
        }
        return socialInformationDTOS;
    }
}
