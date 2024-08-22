package br.socialhub.api.services;

import br.socialhub.api.enums.RoleType;
import br.socialhub.api.models.Cargo;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    public Cargo createCargo(final RoleType roleType){
        return new Cargo(roleType);
    }
}
