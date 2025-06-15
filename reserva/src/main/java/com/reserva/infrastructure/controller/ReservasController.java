package com.reserva.infrastructure.controller;

import com.reserva.domain.model.Reserva;
import com.reserva.application.dto.ReservaDTO;
import com.reserva.application.service.ReservaService;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController  
@RequestMapping("/reservas")
public class ReservasController {
    @Autowired
    private ReservaService service;

    @Autowired
    private AmqpTemplate amqpTemplate;

    @GetMapping
    public List<Reserva> listar() {
        return service.listar();  
    }

    @GetMapping
    @RequestMapping("/completa/{reservaId}")
    public ReservaDTO getReservaCompleta(@PathVariable Long reservaId) {
        return service.getReservaCompleta(reservaId);  
    }

    @PostMapping("/salvar")
    public Reserva salvar(@RequestBody Reserva reserva) {
        return service.salvar(reserva);  
    }

    @PostMapping("/criar-com-mensageria")
        public void criarComMensageria(@RequestParam Long usuarioId,
                                    @RequestParam Long salaId,
                                    @RequestParam String dataHora) {
            String mensagem = usuarioId + "," + salaId + "," + dataHora;
            amqpTemplate.convertAndSend("gatewayQueue", mensagem);
            System.out.println("Mensagem enviada para a fila: " + mensagem);
        }
}
