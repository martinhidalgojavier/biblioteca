package com.biblioteca.biblioteca.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.biblioteca.biblioteca.model.Libro;
import com.biblioteca.biblioteca.repository.LibroRepository;

/**
 * Servicio que gestiona la lógica de negocio de los libros.
 */
@Service
public class LibroService {

    private final LibroRepository libroRepository;

    public LibroService(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    /**
     * Devuelve la lista completa de libros.
     */
    public List<Libro> listarTodos() {
        return libroRepository.findAll();
    }

    /**
     * Busca un libro por su id.
     */
    public Libro buscarPorId(Long id) {
        Optional<Libro> libro = libroRepository.findById(id);
        Libro resultado = null;
        if (libro.isPresent()) {
            resultado = libro.get();
        }
        return resultado;
    }

    /**
     * Guarda un nuevo libro o actualiza uno existente.
     */
    public Libro guardar(Libro libro) {
        return libroRepository.save(libro);
    }

    /**
     * Elimina un libro por su id.
     */
    public void eliminar(Long id) {
        libroRepository.deleteById(id);
    }
}