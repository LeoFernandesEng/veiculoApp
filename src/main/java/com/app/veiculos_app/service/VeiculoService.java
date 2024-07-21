package com.app.veiculos_app.service;

import com.app.veiculos_app.model.Veiculo;
import com.app.veiculos_app.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;


    public List<Veiculo> getVeiculos(String marca, Integer ano, String cor) {
        List<Veiculo> veiculos = veiculoRepository.findAll();

        return veiculos.stream()
                .filter(veiculo -> (marca == null || veiculo.getMarca().equalsIgnoreCase(marca)) &&
                        (ano == null || veiculo.getAno().equals(ano)) &&
                        (cor == null || (veiculo.getCor() != null && veiculo.getCor().equalsIgnoreCase(cor))))
                .collect(Collectors.toList());
    }

    public long countVeiculosNaoVendidos() {
        return veiculoRepository.countByVendidoFalse();
    }

    public Map<String, Long> getDistribuicaoPorDecada() {
        return veiculoRepository.findAll().stream()
                .collect(Collectors.groupingBy(v -> (v.getAno() / 10) * 10 + "s", Collectors.counting()));
    }

    public Map<String, Long> getDistribuicaoPorFabricante() {
        return veiculoRepository.findAll().stream()
                .collect(Collectors.groupingBy(Veiculo::getMarca, Collectors.counting()));
    }

    public List<Veiculo> getVeiculosUltimaSemana() {
        LocalDateTime umaSemanaAtras = LocalDateTime.now().minusWeeks(1);
        return veiculoRepository.findByCreatedAfter(umaSemanaAtras);
    }

    public List<Veiculo> getAllVeiculos() {
        return veiculoRepository.findAll();
    }

    public Optional<Veiculo> getVeiculoById(Long id) {
        return veiculoRepository.findById(id);
    }

    public Veiculo saveVeiculo(Veiculo veiculo) {
        return veiculoRepository.save(veiculo);
    }

    public Veiculo updateVeiculo(Long id, Veiculo veiculoDetails) {
        Veiculo veiculo = veiculoRepository.findById(id).orElseThrow();
        veiculo.setVeiculo(veiculoDetails.getVeiculo());
        veiculo.setMarca(veiculoDetails.getMarca());
        veiculo.setAno(veiculoDetails.getAno());
        veiculo.setCor(veiculoDetails.getCor());
        veiculo.setDescricao(veiculoDetails.getDescricao());
        veiculo.setVendido(veiculoDetails.getVendido());
        return veiculoRepository.save(veiculo);
    }

    public void deleteVeiculo(Long id) {
        veiculoRepository.deleteById(id);
    }
}
