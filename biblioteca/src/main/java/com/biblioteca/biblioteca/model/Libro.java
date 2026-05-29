package com.biblioteca.biblioteca.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Entidad que representa un libro de la biblioteca.
 */
@Entity
@Table(name = "libros")
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private int anioPublicacion;

    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Autor autor;

    @ManyToMany
    @JoinTable(
        name = "libro_genero",
        joinColumns = @JoinColumn(name = "libro_id"),
        inverseJoinColumns = @JoinColumn(name = "genero_id")
    )
    private List<Genero> generos;

    public Libro() {}

    public Libro(String titulo, int anioPublicacion, Autor autor) {
        this.titulo = titulo;
        this.anioPublicacion = anioPublicacion;
        this.autor = autor;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public int getAnioPublicacion() { return anioPublicacion; }
    public void setAnioPublicacion(int anioPublicacion) { this.anioPublicacion = anioPublicacion; }

    public Autor getAutor() { return autor; }
    public void setAutor(Autor autor) { this.autor = autor; }

    public List<Genero> getGeneros() { return generos; }
    public void setGeneros(List<Genero> generos) { this.generos = generos; }
}