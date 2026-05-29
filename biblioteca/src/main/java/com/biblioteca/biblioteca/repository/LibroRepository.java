package com.biblioteca.biblioteca.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.biblioteca.biblioteca.model.Libro;

/**
 * Repositorio para la entidad Libro.
 */
public interface LibroRepository extends JpaRepository<Libro, Long> {
}