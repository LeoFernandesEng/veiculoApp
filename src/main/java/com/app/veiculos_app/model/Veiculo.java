package com.app.veiculos_app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    private String veiculo;

    @Setter
    @Getter
    private String marca;

    @Setter
    @Getter
    private Integer ano;

    @Setter
    @Getter
    private String descricao;

    @Setter
    @Getter
    private Boolean vendido;

    @Setter
    @Getter
    private LocalDateTime created;

    @Setter
    @Getter
    private LocalDateTime updated;

    // Getters e Setters

    @PrePersist
    protected void onCreate() {
        created = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updated = LocalDateTime.now();
    }
}
