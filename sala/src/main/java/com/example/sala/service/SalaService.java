package com.example.sala.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sala.model.Sala;
import com.example.sala.repository.SalaRepository;

@Service
public class SalaService {

    @Autowired
    private SalaRepository salaRepository;

    public List<Sala> listarSalas() {
        return salaRepository.findAll();
    }

    public Sala getSala(Long salaId) {
        return salaRepository.findById(salaId).orElseThrow(() -> new RuntimeException("Sala não encontrada"));
    }

    public Sala salvarSala(Sala sala) {
        return salaRepository.save(sala);
    }
}
