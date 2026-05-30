package com.biblioteca.biblioteca.service;

import com.biblioteca.biblioteca.model.Genero;
import com.biblioteca.biblioteca.repository.GeneroRepository;
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
 * Pruebas unitarias del servicio de géneros.
 */
@ExtendWith(MockitoExtension.class)
class GeneroServiceTest {

    @Mock
    private GeneroRepository generoRepository;

    @InjectMocks
    private GeneroService generoService;

    @Test
    void listarTodosDevuelveListaDeGeneros() {
        List<Genero> generos = new ArrayList<>();
        generos.add(new Genero("Novela"));
        generos.add(new Genero("Poesía"));
        when(generoRepository.findAll()).thenReturn(generos);

        List<Genero> resultado = generoService.listarTodos();

        assertEquals(2, resultado.size());
        verify(generoRepository).findAll();
    }

    @Test
    void buscarPorIdExistenteDevuelveGenero() {
        Genero genero = new Genero("Novela");
        when(generoRepository.findById(1L)).thenReturn(Optional.of(genero));

        Genero resultado = generoService.buscarPorId(1L);

        assertNotNull(resultado);
        assertEquals("Novela", resultado.getNombre());
    }

    @Test
    void buscarPorIdInexistenteDevuelveNull() {
        when(generoRepository.findById(99L)).thenReturn(Optional.empty());

        Genero resultado = generoService.buscarPorId(99L);

        assertNull(resultado);
    }

    @Test
    void guardarDevuelveGeneroGuardado() {
        Genero genero = new Genero("Ensayo");
        when(generoRepository.save(genero)).thenReturn(genero);

        Genero resultado = generoService.guardar(genero);

        assertEquals("Ensayo", resultado.getNombre());
        verify(generoRepository).save(genero);
    }

    @Test
    void eliminarLlamaAlRepositorio() {
        generoService.eliminar(1L);

        verify(generoRepository).deleteById(1L);
    }
}