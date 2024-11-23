package br.socialhub.api.controllers;

import br.socialhub.api.services.AnexoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import static br.socialhub.api.utils.Constantes.ENDPOINT_ANEXOS;

@RequiredArgsConstructor
@RestController
@RequestMapping(ENDPOINT_ANEXOS)
public class AnexoController {

    private final AnexoService anexoService;

        @GetMapping("view/{id}")
        public ResponseEntity<byte[]> getAnexo(@PathVariable Long id) {
            try {
                var arquivo = anexoService.getAnexo(id);

                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_TYPE, arquivo.getMimeType());
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"arquivo_" + arquivo.getNomeArquivo() + "\"");

                return new ResponseEntity<>(arquivo.getArquivo(), headers, HttpStatus.OK);
            } catch (ResponseStatusException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @GetMapping("download/{id}")
        public ResponseEntity<byte[]> downloadAnexo(@PathVariable Long id) {
            try {
                var arquivo = anexoService.getAnexo(id);

                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_TYPE, arquivo.getMimeType());
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"arquivo_" + arquivo.getNomeArquivo() + "\"");

                return new ResponseEntity<>(arquivo.getArquivo(), headers, HttpStatus.OK);
            } catch (ResponseStatusException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
}
