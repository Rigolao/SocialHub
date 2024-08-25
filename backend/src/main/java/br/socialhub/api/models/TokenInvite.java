package br.socialhub.api.models;

import br.socialhub.api.converters.TokenStatusConverter;
import br.socialhub.api.enums.TokenStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static br.socialhub.api.utils.Constantes.ONE_DAY;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "TOKEN_INVITE", schema = "socialhub")
public class TokenInvite {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String token;

    @ManyToOne
    @JoinColumn(name = "IDUSUARIO",referencedColumnName = "IDUSUARIO", nullable = false)
    private Usuario user;

    @ManyToOne
    @JoinColumn(name = "IDSPACE",referencedColumnName = "IDSPACE", nullable = false)
    private Space space;

    @ManyToOne
    @JoinColumn(name = "IDCARGO",referencedColumnName = "IDCARGO", nullable = false)
    private Cargo role;

    @Column(name = "DTINICIO", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "DTFIM", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "STATUS")
    @Convert(converter = TokenStatusConverter.class)
    private TokenStatus status;

    public TokenInvite(Usuario user, Space space, Cargo role){
        this.user = user;
        this.space = space;
        this.role = role;
        this.startDate = LocalDateTime.now();
        this.endDate = startDate.plusDays(ONE_DAY);
        this.status = TokenStatus.UNUSED;
    }
}
