package com.biblioteca.biblioteca.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.biblioteca.biblioteca.model.Autor;
import com.biblioteca.biblioteca.repository.AutorRepository;

/**
 * Servicio que gestiona la lógica de negocio de los autores.
 */
@Service
public class AutorService {

    private final AutorRepository autorRepository;

    public AutorService(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }

    /**
     * Devuelve la lista completa de autores.
     */
    public List<Autor> listarTodos() {
        return autorRepository.findAll();
    }

    /**
     * Busca un autor por su id.
     */
    public Autor buscarPorId(Long id) {
        Optional<Autor> autor = autorRepository.findById(id);
        Autor resultado = null;
        if (autor.isPresent()) {
            resultado = autor.get();
        }
        return resultado;
    }

    /**
     * Guarda un nuevo autor o actualiza uno existente.
     */
    public Autor guardar(Autor autor) {
        return autorRepository.save(autor);
    }

    /**
     * Elimina un autor por su id.
     */
    public void eliminar(Long id) {
        autorRepository.deleteById(id);
    }
}