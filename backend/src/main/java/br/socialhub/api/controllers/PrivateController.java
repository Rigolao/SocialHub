package br.socialhub.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("private")
public class PrivateController {

    @GetMapping
    public String getMessage() {
        return "Hello from private API Controller";
    }
    @GetMapping("criador")
    public String getCriador() { return "Apenas criador do space pode acessar esse recurso.";}

    @GetMapping("editor")
    public String getEditor() { return "Apenas criador e editor pode acessar esse recursor.";}

    @GetMapping("visualizador")
    public String getVisualizador() { return "Apenas visualizador, criador e editor pode acessar esse recursor.";}
}
