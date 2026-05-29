package com.biblioteca.biblioteca.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.biblioteca.biblioteca.model.Genero;
import com.biblioteca.biblioteca.repository.GeneroRepository;

/**
 * Servicio que gestiona la lógica de negocio de los géneros.
 */
@Service
public class GeneroService {

    private final GeneroRepository generoRepository;

    public GeneroService(GeneroRepository generoRepository) {
        this.generoRepository = generoRepository;
    }

    /**
     * Devuelve la lista completa de géneros.
     */
    public List<Genero> listarTodos() {
        return generoRepository.findAll();
    }

    /**
     * Busca un género por su id.
     */
    public Genero buscarPorId(Long id) {
        Optional<Genero> genero = generoRepository.findById(id);
        Genero resultado = null;
        if (genero.isPresent()) {
            resultado = genero.get();
        }
        return resultado;
    }

    /**
     * Guarda un nuevo género o actualiza uno existente.
     */
    public Genero guardar(Genero genero) {
        return generoRepository.save(genero);
    }

    /**
     * Elimina un género por su id.
     */
    public void eliminar(Long id) {
        generoRepository.deleteById(id);
    }
}