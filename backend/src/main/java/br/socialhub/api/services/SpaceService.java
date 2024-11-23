package br.socialhub.api.services;

import br.socialhub.api.dtos.post.PostDTO;
import br.socialhub.api.dtos.post.PostQueryDTO;
import br.socialhub.api.dtos.social_media.SocialMediaResponseDTO;
import br.socialhub.api.dtos.space.SpaceCreateDTO;
import br.socialhub.api.dtos.space.SpaceResponseDTO;
import br.socialhub.api.dtos.space.SpaceUpdateDTO;
import br.socialhub.api.dtos.user.MemberResponseDTO;
import br.socialhub.api.enums.ActiveInactive;
import br.socialhub.api.enums.RoleType;
import br.socialhub.api.exceptions.DefaultSpaceDeletionException;
import br.socialhub.api.exceptions.ResourceNotFoundException;
import br.socialhub.api.models.*;
import br.socialhub.api.repositories.AccountRepository;
import br.socialhub.api.repositories.PostRepository;
import br.socialhub.api.repositories.SpaceRepository;
import br.socialhub.api.repositories.UserSpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static br.socialhub.api.utils.Constantes.*;

@RequiredArgsConstructor
@Service
public class SpaceService {
    private final SpaceRepository spaceRepository;
    private final PostRepository postRepository;
    private final AccountRepository accountRepository;
    private final UserSpaceRepository userSpaceRepository;

    public Space createSpace(final SpaceCreateDTO spaceCreateDTO) {

        return spaceRepository.save(new Space(spaceCreateDTO.name()));
    }

    public SpaceResponseDTO updateSpace(final SpaceUpdateDTO spaceUpdateDTO, final Long id) {
        Space space = findById(id);
        space.setName(spaceUpdateDTO.name());
        return createResponse(spaceRepository.save(space));
    }

    public Space createSpaceDefault() {
        return spaceRepository.save(new Space(NAME_DEFAULT_SPACE));
    }

    private List<MemberResponseDTO> getMembers(final Space space) {
        return space.getUserSpaces().stream()
                .map(MemberResponseDTO::new)
                .collect(Collectors.toList());
    }

    public Space findById(final Long id) {
        return spaceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(RESOURCE_SPACE));
    }

    public SpaceResponseDTO getSpaceById(final Long id) {
        Space space = findById(id);

        return new SpaceResponseDTO(space.getId(), space.getName(), getMembers(space));
    }

    public SpaceResponseDTO createResponse(final Space space) {
        return new SpaceResponseDTO(space, getMembers(space));
    }

    public Usuario getCreatorInSpace(final Space space) {
        return space.getUserSpaces().stream()
                .filter(userSpace -> userSpace.getRole().getDescription().equals(RoleType.CREATOR))
                .map(UsuarioSpace::getUser)
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(RESOURCE_USER));
    }

    public void associateAccountWithSpace(final Space space, final SocialNetwork socialNetwork, final String token){
        final Conta conta = new Conta(space,socialNetwork,token);

        accountRepository.save(conta);
    }

    public List<SocialMediaResponseDTO> getSocialNetworksForSpace(Long id) {
        Space space = findById(id);

        return space.getAccounts().stream()
                .map(conta -> new SocialMediaResponseDTO(conta.getSocialNetwork().getId(), conta.getSocialNetwork().getNome())).toList();
    }

    public List<PostDTO> getSpacePosts(Long id,  int year, int month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);

        List<PostQueryDTO> result = postRepository.findAllBySpaceIdAndMonthAndYear(id,startOfMonth,endOfMonth);

        return result.stream()
                .collect(Collectors.groupingBy(
                        PostQueryDTO::id,
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                postList -> {
                                    PostQueryDTO first = postList.get(0);
                                    List<SocialMediaResponseDTO> redesSociais = postList.stream()
                                            .map(postList1 -> new SocialMediaResponseDTO(postList1.idRedeSocial(), postList1.nomeRedeSocial()))
                                            .collect(Collectors.toList());
                                    return new PostDTO(first.id(), first.title(), first.dataAgendamento(), first.status(), redesSociais);
                                }
                        )
                ))
                .values()
                .stream()
                .toList();
    }

    public void deleteSpace(Long id, Usuario user) {
        Space space = findById(id);

        _validateDeleteSpace(space, user);
        space.setStatus(ActiveInactive.INACTIVE);

        spaceRepository.save(space);
    }

    private void _validateDeleteSpace(Space space, Usuario user) {
        Optional<UsuarioSpace> userSpaceOptional = userSpaceRepository.findByUserAndSpace(user, space);

        if(userSpaceOptional.isPresent()){
            UsuarioSpace userSpace = userSpaceOptional.get();

            if(userSpace.isDefault()){
                throw new DefaultSpaceDeletionException("Não é permitido deletar o espaço que é o default do usuário.");
            }
        }
    }

}
