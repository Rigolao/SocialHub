package br.socialhub.api.services;

import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.Anexo;
import br.socialhub.api.repositories.AnexoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnexoService {

    private final AnexoRepository anexoRepository;

    public Anexo getAnexo(Long id){
        Optional<Anexo> optionalAnexo = anexoRepository.findById(id);

        if(optionalAnexo.isPresent()){
            return optionalAnexo.get();
        }

        throw new ResourceNotFoundException("O id " + id);
    }
}
