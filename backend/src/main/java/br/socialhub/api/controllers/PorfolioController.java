package br.socialhub.api.controllers;

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

//    @GetMapping("{userId}")
//    public ResponseEntity<byte[]> getPorfolio(@PathVariable Long id) {
//
//    }

}
