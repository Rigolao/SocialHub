package br.socialhub.api.models;

import br.socialhub.api.enums.ActiveInactive;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "CONTA", schema = "socialhub")
@Entity
public class Conta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDCONTA")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IDSPACE", referencedColumnName = "IDSPACE", nullable = false)
    private Space space;

    @Column(name = "TOKEN")
    private String token;

    @Column(name = "STATUS", length = 50, nullable = false)
    @Enumerated(EnumType.STRING)
    private ActiveInactive status;

    @OneToOne
    @JoinColumn(name = "IDREDESOCIAL", referencedColumnName = "IDREDESOCIAL", nullable = false)
    private SocialNetwork socialNetwork;

    @OneToMany(mappedBy = "conta", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<ContaPostagem> contaPostagem;


   @PrePersist
   public void prePersist(){
       if(this.status == null){
           this.status = ActiveInactive.ACTIVE;
       }
   }
    public Conta(Space space, SocialNetwork socialNetwork, String token){
        this.socialNetwork = socialNetwork;
        this.space = space;
        this.token = token;
        this.status = ActiveInactive.ACTIVE;
    }
}
