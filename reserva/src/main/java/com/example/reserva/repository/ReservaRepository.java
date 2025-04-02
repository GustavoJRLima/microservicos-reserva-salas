package com.example.reserva.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.reserva.model.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

}
