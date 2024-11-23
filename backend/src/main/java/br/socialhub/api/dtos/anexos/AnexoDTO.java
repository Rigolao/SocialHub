package br.socialhub.api.dtos.anexos;

import br.socialhub.api.models.Anexo;

import static br.socialhub.api.utils.Constantes.LINK_URL_ANEXOS;

public record AnexoDTO(Long id, String nameFile, String url) {
    public AnexoDTO(Anexo anexo){
        this(anexo.getId(), anexo.getNomeArquivo(), String.format(LINK_URL_ANEXOS,anexo.getId()));
    }
}
