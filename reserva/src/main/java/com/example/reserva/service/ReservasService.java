package com.example.reserva.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.reserva.dto.ReservaDTO;
import com.example.reserva.dto.SalaDTO;
import com.example.reserva.dto.UsuarioDTO;
import com.example.reserva.model.Reserva;
import com.example.reserva.repository.ReservaRepository;

@Service
public class ReservasService {
    
    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private RestTemplate restTemplate;

    public List<Reserva> listarReservas() {
        return reservaRepository.findAll();
    }

    public ReservaDTO getReserva(Long reservaId) {
        Reserva reserva = reservaRepository.findById(reservaId).orElseThrow(() -> new RuntimeException("Reserva não encontrada"));

        UsuarioDTO usuario = restTemplate.getForObject("http://localhost:8082/usuarios/" + reserva.getUsuarioId(), UsuarioDTO.class);

        SalaDTO sala = restTemplate.getForObject("http://localhost:8082/salas/" + reserva.getSalaId(), SalaDTO.class);

        return new ReservaDTO(reserva, usuario, sala);
    }

    public Reserva salvarReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }
}
