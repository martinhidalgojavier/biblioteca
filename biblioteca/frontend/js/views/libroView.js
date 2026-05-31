import {
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
} from "../services/libroService.js";
import { obtenerAutores } from "../services/autorService.js";
import { obtenerGeneros } from "../services/generoService.js";

const contenido = document.getElementById("contenido");

/**
 * Muestra el listado completo de libros con sus botones de acción.
 */
export async function mostrarLibros() {
    const libros = await obtenerLibros();

    let html = `<button class="btn-nuevo" id="btnNuevoLibro">+ Nuevo libro</button>`;

    if (libros.length === 0) {
        html += `<p>No hay libros registrados.</p>`;
    } else {
        libros.forEach(function (libro) {
            let nombreAutor = "Sin autor";
            if (libro.autor !== null) {
                nombreAutor = libro.autor.nombre;
            }
            html += `
                <div class="tarjeta">
                    <div class="tarjeta-info">
                        <h3>${libro.titulo}</h3>
                        <span>${nombreAutor} · ${libro.anioPublicacion}</span>
                    </div>
                    <div class="acciones">
                        <button class="btn-ver" data-id="${libro.id}">Ver</button>
                        <button class="btn-editar" data-id="${libro.id}">Editar</button>
                        <button class="btn-borrar" data-id="${libro.id}">Borrar</button>
                    </div>
                </div>`;
        });
    }

    contenido.innerHTML = html;

    document.getElementById("btnNuevoLibro").addEventListener("click", mostrarFormularioNuevo);

    document.querySelectorAll(".btn-ver").forEach(function (boton) {
        boton.addEventListener("click", function () {
            mostrarDetalle(boton.dataset.id);
        });
    });

    document.querySelectorAll(".btn-editar").forEach(function (boton) {
        boton.addEventListener("click", function () {
            mostrarFormularioEditar(boton.dataset.id);
        });
    });

    document.querySelectorAll(".btn-borrar").forEach(function (boton) {
        boton.addEventListener("click", function () {
            borrar(boton.dataset.id);
        });
    });
}

/**
 * Construye las opciones del desplegable de autores.
 */
function construirOpcionesAutores(autores, idSeleccionado) {
    let opciones = "";
    autores.forEach(function (autor) {
        let seleccionado = "";
        if (autor.id === idSeleccionado) {
            seleccionado = "selected";
        }
        opciones += `<option value="${autor.id}" ${seleccionado}>${autor.nombre}</option>`;
    });
    return opciones;
}

/**
 * Construye los checkboxes de géneros, marcando los ya asociados.
 */
function construirCheckboxesGeneros(generos, idsSeleccionados) {
    let checkboxes = "";
    generos.forEach(function (genero) {
        let marcado = "";
        if (idsSeleccionados.includes(genero.id) === true) {
            marcado = "checked";
        }
        checkboxes += `
            <label>
                <input type="checkbox" class="checkGenero" value="${genero.id}" ${marcado}>
                ${genero.nombre}
            </label>`;
    });
    return checkboxes;
}

/**
 * Recoge los ids de los géneros marcados en el formulario.
 */
function recogerGenerosSeleccionados() {
    const generos = [];
    document.querySelectorAll(".checkGenero").forEach(function (check) {
        if (check.checked === true) {
            generos.push({ id: Number(check.value) });
        }
    });
    return generos;
}

/**
 * Muestra el formulario para crear un libro nuevo.
 */
async function mostrarFormularioNuevo() {
    const autores = await obtenerAutores();
    const generos = await obtenerGeneros();

    contenido.innerHTML = `
        <form id="formLibro">
            <h2>Nuevo libro</h2>
            <label>Título</label>
            <input type="text" id="titulo" required>
            <label>Año de publicación</label>
            <input type="number" id="anio" required>
            <label>Autor</label>
            <select id="autor">${construirOpcionesAutores(autores, null)}</select>
            <label>Géneros</label>
            <div class="checkbox-grupo">${construirCheckboxesGeneros(generos, [])}</div>
            <button type="submit">Guardar</button>
        </form>`;

    document.getElementById("formLibro").addEventListener("submit", async function (evento) {
        evento.preventDefault();
        const libro = {
            titulo: document.getElementById("titulo").value,
            anioPublicacion: Number(document.getElementById("anio").value),
            autor: { id: Number(document.getElementById("autor").value) },
            generos: recogerGenerosSeleccionados()
        };
        await crearLibro(libro);
        mostrarLibros();
    });
}

/**
 * Muestra el formulario de edición con los datos precargados.
 */
async function mostrarFormularioEditar(id) {
    const libro = await obtenerLibroPorId(id);
    const autores = await obtenerAutores();
    const generos = await obtenerGeneros();

    let idAutor = null;
    if (libro.autor !== null) {
        idAutor = libro.autor.id;
    }

    const idsGeneros = [];
    libro.generos.forEach(function (genero) {
        idsGeneros.push(genero.id);
    });

    contenido.innerHTML = `
        <form id="formLibro">
            <h2>Editar libro</h2>
            <label>Título</label>
            <input type="text" id="titulo" value="${libro.titulo}" required>
            <label>Año de publicación</label>
            <input type="number" id="anio" value="${libro.anioPublicacion}" required>
            <label>Autor</label>
            <select id="autor">${construirOpcionesAutores(autores, idAutor)}</select>
            <label>Géneros</label>
            <div class="checkbox-grupo">${construirCheckboxesGeneros(generos, idsGeneros)}</div>
            <button type="submit">Actualizar</button>
        </form>`;

    document.getElementById("formLibro").addEventListener("submit", async function (evento) {
        evento.preventDefault();
        const libroActualizado = {
            titulo: document.getElementById("titulo").value,
            anioPublicacion: Number(document.getElementById("anio").value),
            autor: { id: Number(document.getElementById("autor").value) },
            generos: recogerGenerosSeleccionados()
        };
        await actualizarLibro(id, libroActualizado);
        mostrarLibros();
    });
}

/**
 * Muestra el detalle de un libro en modo solo lectura.
 */
async function mostrarDetalle(id) {
    const libro = await obtenerLibroPorId(id);

    let nombreAutor = "Sin autor";
    if (libro.autor !== null) {
        nombreAutor = libro.autor.nombre;
    }

    let listaGeneros = "Sin géneros";
    if (libro.generos.length > 0) {
        listaGeneros = libro.generos.map(function (genero) {
            return genero.nombre;
        }).join(", ");
    }

    contenido.innerHTML = `
        <div class="tarjeta">
            <div class="tarjeta-info">
                <h2>${libro.titulo}</h2>
                <p><strong>Autor:</strong> ${nombreAutor}</p>
                <p><strong>Año:</strong> ${libro.anioPublicacion}</p>
                <p><strong>Géneros:</strong> ${listaGeneros}</p>
                <p><strong>ID:</strong> ${libro.id}</p>
            </div>
        </div>
        <button class="btn-nuevo" id="btnVolver">Volver</button>`;

    document.getElementById("btnVolver").addEventListener("click", mostrarLibros);
}

/**
 * Elimina un libro tras confirmar.
 */
async function borrar(id) {
    const confirmado = confirm("¿Seguro que quieres borrar este libro?");
    if (confirmado === true) {
        await eliminarLibro(id);
        mostrarLibros();
    }
}