package br.socialhub.api.services;

import br.socialhub.api.dtos.role.RoleResponseDTO;
import br.socialhub.api.enums.RoleType;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.Cargo;
import br.socialhub.api.repositories.CargoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static br.socialhub.api.utils.Constantes.RESOURCE_ROLE;

@RequiredArgsConstructor
@Service
public class RoleService {
    private final CargoRepository cargoRepository;
    private Cargo findRoleCreator(){
        return cargoRepository.findByDescription(RoleType.CREATOR);
    }

    public Cargo roleCreator(){
        return findRoleCreator();
    }

    public List<RoleResponseDTO> getAll() {
        return cargoRepository.findAll().stream()
                .filter(role -> !role.getDescription().equals(RoleType.CREATOR))
                .map(RoleResponseDTO::new).collect(Collectors.toList());
    }

    public Cargo findById(Long id){
        return cargoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_ROLE));
    }

}
