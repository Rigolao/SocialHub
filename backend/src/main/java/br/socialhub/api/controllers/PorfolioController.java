package br.socialhub.api.controllers;

import br.socialhub.api.dtos.portfolio.PortfolioResponseDTO;
import br.socialhub.api.services.PorfolioService;
import br.socialhub.api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static br.socialhub.api.utils.Constantes.ENDPOINT_PORTFOLIO;

@RequiredArgsConstructor
@RestController
@RequestMapping(ENDPOINT_PORTFOLIO)
public class PorfolioController {

    private final UserService userService;
    private final PorfolioService porfolioService;
    @GetMapping("{userId}")
    public ResponseEntity<PortfolioResponseDTO> getPorfolio(@PathVariable Long userId) {
        var user = userService.findById(userId);

        return ResponseEntity.ok(porfolioService.getPorfolio(user));
    }

}
