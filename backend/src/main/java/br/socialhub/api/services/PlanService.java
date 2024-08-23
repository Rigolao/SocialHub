package br.socialhub.api.services;

import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.Plano;
import br.socialhub.api.repositories.PlanoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static br.socialhub.api.utils.Constantes.RESOURCE_PLAN;

@RequiredArgsConstructor
@Service
public class PlanService {
    private final PlanoRepository planoRepository;

    public Plano findById(Long id) {
        return planoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_PLAN));
    }
}
