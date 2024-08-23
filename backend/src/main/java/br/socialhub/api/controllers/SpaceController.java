package br.socialhub.api.controllers;

import br.socialhub.api.dtos.space.SpaceCreateDTO;
import br.socialhub.api.dtos.space.SpaceResponseDTO;
import br.socialhub.api.enums.RoleType;
import br.socialhub.api.services.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import static br.socialhub.api.utils.Constantes.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(ENDPOINT_SPACE)
public class SpaceController {
    private final JwtService jwtService;
    private final SpaceService spaceService;
    private final UserService userService;
    private final RoleService roleService;
    private final UserSpaceService userSpaceService;

    @Transactional
    @PostMapping
    public ResponseEntity<?> createSpace(@RequestHeader(AUTHORIZATION) @NotBlank final String token,
                                        @RequestBody @Valid final SpaceCreateDTO spaceCreateDTO){
        var email = jwtService.extractSubject(token.replace(BEARER, WHITESPACE));

        var space = spaceService.createSpace(spaceCreateDTO);
        var user = userService.findByEmail(email);
        var role = roleService.roleCreator();

        userSpaceService.assignRoleToUserInSpace(user, space, role);

        var response = spaceService.createResponse(space);

        return ResponseEntity.ok(response);
    }

    @GetMapping("{id}")
    public ResponseEntity<SpaceResponseDTO> getSpace(@PathVariable final Long id){
        return ResponseEntity.ok(spaceService.getSpaceById(id));
    }
}
