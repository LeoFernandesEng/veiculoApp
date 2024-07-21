package com.app.veiculos_app.controller;

import com.app.veiculos_app.model.Veiculo;
import com.app.veiculos_app.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @GetMapping
    public List<Veiculo> getVeiculos(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) Integer ano,
            @RequestParam(required = false) String cor) {
        if (marca == null && ano == null && cor == null) {
            return veiculoService.getAllVeiculos();
        } else {
            return veiculoService.getVeiculos(marca, ano, cor);
        }
    }


    @GetMapping("/{id}")
    public Optional<Veiculo> getVeiculoById(@PathVariable Long id) {
        return veiculoService.getVeiculoById(id);
    }

    @PostMapping
    public Veiculo createVeiculo(@RequestBody Veiculo veiculo) {
        return veiculoService.saveVeiculo(veiculo);
    }

    @PutMapping("/{id}")
    public Veiculo updateVeiculo(@PathVariable Long id, @RequestBody Veiculo veiculoDetails) {
        return veiculoService.updateVeiculo(id, veiculoDetails);
    }

    @PatchMapping("/{id}")
    public Veiculo partialUpdateVeiculo(@PathVariable Long id, @RequestBody Veiculo veiculoDetails) {
        Veiculo veiculo = veiculoService.getVeiculoById(id).orElseThrow();
        if (veiculoDetails.getVeiculo() != null) {
            veiculo.setVeiculo(veiculoDetails.getVeiculo());
        }
        if (veiculoDetails.getMarca() != null) {
            veiculo.setMarca(veiculoDetails.getMarca());
        }
        if (veiculoDetails.getAno() != null) {
            veiculo.setAno(veiculoDetails.getAno());
        }
        if (veiculoDetails.getCor() != null){
            veiculo.setCor(veiculoDetails.getCor());
        }
        if (veiculoDetails.getDescricao() != null) {
            veiculo.setDescricao(veiculoDetails.getDescricao());
        }
        if (veiculoDetails.getVendido() != null) {
            veiculo.setVendido(veiculoDetails.getVendido());
        }
        return veiculoService.saveVeiculo(veiculo);
    }

    @DeleteMapping("/{id}")
    public void deleteVeiculo(@PathVariable Long id) {
        veiculoService.deleteVeiculo(id);
    }

    @GetMapping("/nao-vendidos/count")
    public ResponseEntity<Long> getCountVeiculosNaoVendidos() {
        long count = veiculoService.countVeiculosNaoVendidos();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/decadas")
    public ResponseEntity<Map<String, Long>> getDistribuicaoPorDecada() {
        Map<String, Long> distribuicao = veiculoService.getDistribuicaoPorDecada();
        return ResponseEntity.ok(distribuicao);
    }

    @GetMapping("/fabricantes")
    public ResponseEntity<Map<String, Long>> getDistribuicaoPorFabricante() {
        Map<String, Long> distribuicao = veiculoService.getDistribuicaoPorFabricante();
        return ResponseEntity.ok(distribuicao);
    }

    @GetMapping("/ultima-semana")
    public ResponseEntity<List<Veiculo>> getVeiculosUltimaSemana() {
        List<Veiculo> veiculos = veiculoService.getVeiculosUltimaSemana();
        return ResponseEntity.ok(veiculos);
    }

}
