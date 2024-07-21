package com.app.veiculos_app.repository;

import com.app.veiculos_app.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    List<Veiculo> findByMarcaAndAnoAndCor(String marca, Integer ano, String cor);

    long countByVendidoFalse();

    List<Veiculo> findByCreatedAfter(LocalDateTime createdAfter);
}
