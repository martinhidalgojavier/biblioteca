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

import com.biblioteca.biblioteca.model.Autor;
import com.biblioteca.biblioteca.service.AutorService;

/**
 * Controlador REST para la gestión de autores.
 */
@RestController
@RequestMapping("/api/v1/autores")
@CrossOrigin(origins = "*")
public class AutorController {

    private final AutorService autorService;

    public AutorController(AutorService autorService) {
        this.autorService = autorService;
    }

    /**
     * Devuelve la lista completa de autores.
     */
    @GetMapping
    public List<Autor> listarTodos() {
        return autorService.listarTodos();
    }

    /**
     * Devuelve un autor por su id.
     */
    @GetMapping("/{id}")
    public Autor buscarPorId(@PathVariable Long id) {
        return autorService.buscarPorId(id);
    }

    /**
     * Crea un nuevo autor.
     */
    @PostMapping
    public Autor crear(@RequestBody Autor autor) {
        return autorService.guardar(autor);
    }

    /**
     * Actualiza un autor existente.
     */
    @PutMapping("/{id}")
    public Autor actualizar(@PathVariable Long id, @RequestBody Autor autor) {
        autor.setId(id);
        return autorService.guardar(autor);
    }

    /**
     * Elimina un autor por su id.
     */
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        autorService.eliminar(id);
    }
}