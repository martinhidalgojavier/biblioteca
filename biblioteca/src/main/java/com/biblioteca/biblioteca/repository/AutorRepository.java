package com.biblioteca.biblioteca.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.biblioteca.biblioteca.model.Autor;

/**
 * Repositorio para la entidad Autor.
 */
public interface AutorRepository extends JpaRepository<Autor, Long> {
}