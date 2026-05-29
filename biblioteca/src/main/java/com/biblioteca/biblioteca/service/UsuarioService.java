package com.biblioteca.biblioteca.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.biblioteca.biblioteca.model.Usuario;
import com.biblioteca.biblioteca.repository.UsuarioRepository;

/**
 * Servicio que gestiona la lógica de negocio de los usuarios.
 */
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Devuelve la lista completa de usuarios.
     */
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    /**
     * Busca un usuario por su id.
     */
    public Usuario buscarPorId(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        Usuario resultado = null;
        if (usuario.isPresent()) {
            resultado = usuario.get();
        }
        return resultado;
    }

    /**
     * Guarda un nuevo usuario o actualiza uno existente.
     */
    public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    /**
     * Elimina un usuario por su id.
     */
    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }
}