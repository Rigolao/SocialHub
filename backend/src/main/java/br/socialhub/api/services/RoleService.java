package br.socialhub.api.services;

import br.socialhub.api.enums.RoleType;
import br.socialhub.api.models.Cargo;
import br.socialhub.api.repositories.CargoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RoleService {
    private final CargoRepository cargoRepository;
    public Cargo findByDescription(final RoleType roleType){
        return cargoRepository.findByDescription(roleType);
    }

    public Cargo roleCreator(){
        return findByDescription(RoleType.CREATOR);
    }
}
