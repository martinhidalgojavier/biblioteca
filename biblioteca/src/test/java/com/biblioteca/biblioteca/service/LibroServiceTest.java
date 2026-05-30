package com.biblioteca.biblioteca.service;

import com.biblioteca.biblioteca.model.Autor;
import com.biblioteca.biblioteca.model.Libro;
import com.biblioteca.biblioteca.repository.LibroRepository;
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
 * Pruebas unitarias del servicio de libros.
 */
@ExtendWith(MockitoExtension.class)
class LibroServiceTest {

    @Mock
    private LibroRepository libroRepository;

    @InjectMocks
    private LibroService libroService;

    @Test
    void listarTodosDevuelveListaDeLibros() {
        Autor autor = new Autor("Gabriel García Márquez", "Colombiano");
        List<Libro> libros = new ArrayList<>();
        libros.add(new Libro("Cien años de soledad", 1967, autor));
        libros.add(new Libro("El amor en los tiempos del cólera", 1985, autor));
        when(libroRepository.findAll()).thenReturn(libros);

        List<Libro> resultado = libroService.listarTodos();

        assertEquals(2, resultado.size());
        verify(libroRepository).findAll();
    }

    @Test
    void buscarPorIdExistenteDevuelveLibro() {
        Autor autor = new Autor("Gabriel García Márquez", "Colombiano");
        Libro libro = new Libro("Cien años de soledad", 1967, autor);
        when(libroRepository.findById(1L)).thenReturn(Optional.of(libro));

        Libro resultado = libroService.buscarPorId(1L);

        assertNotNull(resultado);
        assertEquals("Cien años de soledad", resultado.getTitulo());
    }

    @Test
    void buscarPorIdInexistenteDevuelveNull() {
        when(libroRepository.findById(99L)).thenReturn(Optional.empty());

        Libro resultado = libroService.buscarPorId(99L);

        assertNull(resultado);
    }

    @Test
    void guardarDevuelveLibroGuardado() {
        Autor autor = new Autor("Mario Vargas Llosa", "Peruano");
        Libro libro = new Libro("La ciudad y los perros", 1963, autor);
        when(libroRepository.save(libro)).thenReturn(libro);

        Libro resultado = libroService.guardar(libro);

        assertEquals("La ciudad y los perros", resultado.getTitulo());
        verify(libroRepository).save(libro);
    }

    @Test
    void eliminarLlamaAlRepositorio() {
        libroService.eliminar(1L);

        verify(libroRepository).deleteById(1L);
    }
}
