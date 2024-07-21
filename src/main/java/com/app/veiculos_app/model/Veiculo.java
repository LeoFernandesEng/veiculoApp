package com.app.veiculos_app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Entity
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private String veiculo;

    @Setter
    private String marca;

    @Setter
    private Integer ano;

    @Setter
    private String cor;

    @Setter
    private String descricao;

    @Setter
    private Boolean vendido;

    @Setter
    private LocalDateTime created;

    @Setter
    private LocalDateTime updated;

    @PrePersist
    protected void onCreate() {
        created = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updated = LocalDateTime.now();
    }
}
