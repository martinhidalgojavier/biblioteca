package com.biblioteca.biblioteca.config;

import com.biblioteca.biblioteca.model.Autor;
import com.biblioteca.biblioteca.model.Genero;
import com.biblioteca.biblioteca.model.Libro;
import com.biblioteca.biblioteca.model.Usuario;
import com.biblioteca.biblioteca.repository.AutorRepository;
import com.biblioteca.biblioteca.repository.GeneroRepository;
import com.biblioteca.biblioteca.repository.LibroRepository;
import com.biblioteca.biblioteca.repository.UsuarioRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Carga datos aleatorios en la base de datos al arrancar la aplicación
 * utilizando la librería Faker.
 */
@Component
public class DataLoader implements CommandLineRunner {

    private final AutorRepository autorRepository;
    private final GeneroRepository generoRepository;
    private final LibroRepository libroRepository;
    private final UsuarioRepository usuarioRepository;

    public DataLoader(AutorRepository autorRepository, GeneroRepository generoRepository,
                      LibroRepository libroRepository, UsuarioRepository usuarioRepository) {
        this.autorRepository = autorRepository;
        this.generoRepository = generoRepository;
        this.libroRepository = libroRepository;
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Genera y guarda autores, géneros, libros y usuarios de prueba.
     */
    @Override
    public void run(String... args) {
        Faker faker = new Faker();

        int numeroGeneros = 5;
        int numeroAutores = 5;
        int numeroLibros = 10;
        int numeroUsuarios = 5;

        List<Genero> generos = new ArrayList<>();
        int contadorGeneros = 0;
        while (contadorGeneros < numeroGeneros) {
            Genero genero = new Genero(faker.book().genre());
            generos.add(generoRepository.save(genero));
            contadorGeneros++;
        }

        List<Autor> autores = new ArrayList<>();
        int contadorAutores = 0;
        while (contadorAutores < numeroAutores) {
            Autor autor = new Autor(faker.book().author(), faker.nation().nationality());
            autores.add(autorRepository.save(autor));
            contadorAutores++;
        }

        List<Libro> libros = new ArrayList<>();
        int contadorLibros = 0;
        while (contadorLibros < numeroLibros) {
            Autor autorAleatorio = autores.get(faker.number().numberBetween(0, autores.size()));
            Libro libro = new Libro(faker.book().title(), faker.number().numberBetween(1950, 2024), autorAleatorio);

            List<Genero> generosLibro = new ArrayList<>();
            generosLibro.add(generos.get(faker.number().numberBetween(0, generos.size())));
            libro.setGeneros(generosLibro);

            libros.add(libroRepository.save(libro));
            contadorLibros++;
        }

        int contadorUsuarios = 0;
        while (contadorUsuarios < numeroUsuarios) {
            Usuario usuario = new Usuario(faker.name().fullName(), faker.internet().emailAddress());

            List<Libro> librosPrestados = new ArrayList<>();
            librosPrestados.add(libros.get(faker.number().numberBetween(0, libros.size())));
            usuario.setLibrosPrestados(librosPrestados);

            usuarioRepository.save(usuario);
            contadorUsuarios++;
        }
    }
}