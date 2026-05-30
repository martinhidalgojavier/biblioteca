package com.biblioteca.biblioteca.service;

import com.biblioteca.biblioteca.model.Autor;
import com.biblioteca.biblioteca.repository.AutorRepository;
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
 * Pruebas unitarias del servicio de autores.
 */
@ExtendWith(MockitoExtension.class)
class AutorServiceTest {

    @Mock
    private AutorRepository autorRepository;

    @InjectMocks
    private AutorService autorService;

    @Test
    void listarTodosDevuelveListaDeAutores() {
        List<Autor> autores = new ArrayList<>();
        autores.add(new Autor("Gabriel García Márquez", "Colombiano"));
        autores.add(new Autor("Isabel Allende", "Chilena"));
        when(autorRepository.findAll()).thenReturn(autores);

        List<Autor> resultado = autorService.listarTodos();

        assertEquals(2, resultado.size());
        verify(autorRepository).findAll();
    }

    @Test
    void buscarPorIdExistenteDevuelveAutor() {
        Autor autor = new Autor("Gabriel García Márquez", "Colombiano");
        when(autorRepository.findById(1L)).thenReturn(Optional.of(autor));

        Autor resultado = autorService.buscarPorId(1L);

        assertNotNull(resultado);
        assertEquals("Gabriel García Márquez", resultado.getNombre());
    }

    @Test
    void buscarPorIdInexistenteDevuelveNull() {
        when(autorRepository.findById(99L)).thenReturn(Optional.empty());

        Autor resultado = autorService.buscarPorId(99L);

        assertNull(resultado);
    }

    @Test
    void guardarDevuelveAutorGuardado() {
        Autor autor = new Autor("Mario Vargas Llosa", "Peruano");
        when(autorRepository.save(autor)).thenReturn(autor);

        Autor resultado = autorService.guardar(autor);

        assertEquals("Mario Vargas Llosa", resultado.getNombre());
        verify(autorRepository).save(autor);
    }

    @Test
    void eliminarLlamaAlRepositorio() {
        autorService.eliminar(1L);

        verify(autorRepository).deleteById(1L);
    }
}