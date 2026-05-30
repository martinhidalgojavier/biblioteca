package com.biblioteca.biblioteca.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biblioteca.biblioteca.model.Genero;
import com.biblioteca.biblioteca.service.GeneroService;

/**
 * Controlador REST para la gestión de géneros.
 */
@RestController
@RequestMapping("/api/v1/generos")
@CrossOrigin(origins = "*")
public class GeneroController {

    private final GeneroService generoService;

    public GeneroController(GeneroService generoService) {
        this.generoService = generoService;
    }

    /**
     * Devuelve la lista completa de géneros.
     */
    @GetMapping
    public List<Genero> listarTodos() {
        return generoService.listarTodos();
    }

    /**
     * Devuelve un género por su id.
     */
    @GetMapping("/{id}")
    public Genero buscarPorId(@PathVariable Long id) {
        return generoService.buscarPorId(id);
    }

    /**
     * Crea un nuevo género.
     */
    @PostMapping
    public Genero crear(@RequestBody Genero genero) {
        return generoService.guardar(genero);
    }

    /**
     * Actualiza un género existente.
     */
    @PutMapping("/{id}")
    public Genero actualizar(@PathVariable Long id, @RequestBody Genero genero) {
        genero.setId(id);
        return generoService.guardar(genero);
    }

    /**
     * Elimina un género por su id.
     */
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        generoService.eliminar(id);
    }
}