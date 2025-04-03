package com.example.sala.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sala.model.Sala;
import com.example.sala.service.SalaService;

@RestController
@RequestMapping("/salas")
public class SalaController {
    
    @Autowired
    private SalaService salaService;

    @GetMapping
    public List<Sala> listarSalas() {
        return salaService.listarSalas();
    }

    @GetMapping("/{salaId}")
    public Sala getSala(@PathVariable Long salaId) {
        return salaService.getSala(salaId);
    }

    @PostMapping("/salvar")
    public Sala salvarSala(Sala sala) {
        return salaService.salvarSala(sala);
    }
}
