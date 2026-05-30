package com.biblioteca.biblioteca.service;

import com.biblioteca.biblioteca.model.Usuario;
import com.biblioteca.biblioteca.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Pruebas unitarias del servicio de usuarios.
 */
@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    void listarTodosDevuelveListaDeUsuarios() {
        List<Usuario> usuarios = new ArrayList<>();
        usuarios.add(new Usuario("Ana López", "ana@correo.com"));
        usuarios.add(new Usuario("Luis Pérez", "luis@correo.com"));
        when(usuarioRepository.findAll()).thenReturn(usuarios);

        List<Usuario> resultado = usuarioService.listarTodos();

        assertEquals(2, resultado.size());
        verify(usuarioRepository).findAll();
    }

    @Test
    void buscarPorIdExistenteDevuelveUsuario() {
        Usuario usuario = new Usuario("Ana López", "ana@correo.com");
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        Usuario resultado = usuarioService.buscarPorId(1L);

        assertNotNull(resultado);
        assertEquals("Ana López", resultado.getNombre());
    }

    @Test
    void buscarPorIdInexistenteDevuelveNull() {
        when(usuarioRepository.findById(99L)).thenReturn(Optional.empty());

        Usuario resultado = usuarioService.buscarPorId(99L);

        assertNull(resultado);
    }

    @Test
    void guardarDevuelveUsuarioGuardado() {
        Usuario usuario = new Usuario("Marta Ruiz", "marta@correo.com");
        when(usuarioRepository.save(usuario)).thenReturn(usuario);

        Usuario resultado = usuarioService.guardar(usuario);

        assertEquals("Marta Ruiz", resultado.getNombre());
        verify(usuarioRepository).save(usuario);
    }

    @Test
    void eliminarLlamaAlRepositorio() {
        usuarioService.eliminar(1L);

        verify(usuarioRepository).deleteById(1L);
    }
}