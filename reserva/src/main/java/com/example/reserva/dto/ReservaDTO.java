package com.example.reserva.dto;

import java.time.LocalDateTime;

import com.example.reserva.model.Reserva;

import lombok.Data;

@Data
public class ReservaDTO {

    private Long id;
    private LocalDateTime dataHora;
    private UsuarioDTO usuario;
    private SalaDTO sala;

    public ReservaDTO() {
    }

    public ReservaDTO(Reserva reserva, UsuarioDTO usuario, SalaDTO sala) {
        this.id = reserva.getId();
        this.dataHora = reserva.getDataHora();
        this.usuario = usuario;
        this.sala = sala;
    }
}
