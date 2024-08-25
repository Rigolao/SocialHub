package br.socialhub.api.controllers;

import br.socialhub.api.dtos.role.RoleResponseDTO;
import br.socialhub.api.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("roles")
public class RoleController {
    private final RoleService roleService;

    @GetMapping
    public ResponseEntity<List<RoleResponseDTO>> getAll(){
        return ResponseEntity.ok(roleService.getAll());
    }
}
