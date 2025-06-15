package com.reserva.application.amqp;

import com.reserva.domain.model.Reserva;
import com.reserva.infrastructure.repository.ReservaRepository;

import java.time.LocalDateTime;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GatewayListener {
    @Autowired
    private ReservaRepository repository;

    @RabbitListener(queues = "gatewayQueue")
    public void receberCriacaoReserva(String mensagem) {
        try {
            String[] partes = mensagem.split(",");
            Long usuarioId = Long.parseLong(partes[0]);
            Long salaId = Long.parseLong(partes[1]);
            LocalDateTime dataHora = LocalDateTime.parse(partes[2]);

            Reserva reserva = new Reserva();
            reserva.setUsuarioId(usuarioId);
            reserva.setSalaId(salaId);
            reserva.setDataHora(dataHora);

            repository.save(reserva);
            System.out.println("Reserva criada via mensageria: Usuário " + usuarioId + ", Sala " + salaId + ", Data/Hora " + dataHora);
        } catch (Exception e) {
            System.err.println("Erro ao processar mensagem de criação de reserva: " + mensagem);
        }
    }
}