package com.example.reserva.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.reserva.dto.ReservaDTO;
import com.example.reserva.model.Reserva;
import com.example.reserva.service.ReservasService;

@RestController
@RequestMapping("/reservas")
public class ReservasController {
    
    @Autowired
    private ReservasService reservasService;

    @GetMapping
    public List<Reserva> listarReservas() {
        return reservasService.listarReservas();
    }

    @GetMapping("/{reservaId}")
    public ReservaDTO getReseva(@PathVariable Long reservaId) {
        return reservasService.getReserva(reservaId);
    }

    @PostMapping("/salvar")
    public Reserva salvarReserva(@RequestBody Reserva reserva) {
        return reservasService.salvarReserva(reserva);
    }
}
