package br.socialhub.api.services;

import br.socialhub.api.dtos.plan.PlanDTO;
import br.socialhub.api.models.Plano;
import br.socialhub.api.models.PlanoUsuario;
import br.socialhub.api.models.Usuario;
import br.socialhub.api.repositories.PlanoUsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class PlanUserService {
    private final PlanoUsuarioRepository planoUsuarioRepository;

    public void assignPlanToUser(Plano plan, Usuario user, PlanDTO planDTO) {
        PlanoUsuario planUser = new PlanoUsuario(plan, user, planDTO);
        planoUsuarioRepository.save(planUser);
    }

}
