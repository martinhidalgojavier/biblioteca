package com.biblioteca.biblioteca.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.biblioteca.biblioteca.model.Genero;

/**
 * Repositorio para la entidad Genero.
 */
public interface GeneroRepository extends JpaRepository<Genero, Long> {
}