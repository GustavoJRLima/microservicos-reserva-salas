package com.example.usuario.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.usuario.model.Usuario;
import com.example.usuario.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }

    @GetMapping("/id/{usuarioId}")
    public Optional<Usuario> getUsuarioById(@PathVariable Long usuarioId) {
        return usuarioService.getUsuarioById(usuarioId);
    }

    @GetMapping("/email/{usuarioEmail}")
    public Optional<Usuario> getUsuarioByEmail(@PathVariable String usuarioEmail) {
        return usuarioService.getUsuarioByEmail(usuarioEmail);
    }

    @PostMapping("/salvar")
    public Usuario salvarUsuario(@RequestBody Usuario usuario) {
        try {
            return usuarioService.salvarUsuario(usuario);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Possível duplicação de email ou problema de integridade de dados.");
        } catch (Exception e) {
            throw new RuntimeException("Erro Interno ao salvar o usuário.");
        }
    }
}
