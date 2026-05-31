import {
    obtenerAutores,
    obtenerAutorPorId,
    crearAutor,
    actualizarAutor,
    eliminarAutor
} from "../services/autorService.js";

const contenido = document.getElementById("contenido");

/**
 * Muestra el listado completo de autores con sus botones de acción.
 */
export async function mostrarAutores() {
    const autores = await obtenerAutores();

    let html = `<button class="btn-nuevo" id="btnNuevoAutor">+ Nuevo autor</button>`;

    if (autores.length === 0) {
        html += `<p>No hay autores registrados.</p>`;
    } else {
        autores.forEach(function (autor) {
            html += `
                <div class="tarjeta">
                    <div class="tarjeta-info">
                        <h3>${autor.nombre}</h3>
                        <span>${autor.nacionalidad}</span>
                    </div>
                    <div class="acciones">
                        <button class="btn-ver" data-id="${autor.id}">Ver</button>
                        <button class="btn-editar" data-id="${autor.id}">Editar</button>
                        <button class="btn-borrar" data-id="${autor.id}">Borrar</button>
                    </div>
                </div>`;
        });
    }

    contenido.innerHTML = html;

    document.getElementById("btnNuevoAutor").addEventListener("click", mostrarFormularioNuevo);

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
 * Muestra el formulario para crear un autor nuevo.
 */
function mostrarFormularioNuevo() {
    contenido.innerHTML = `
        <form id="formAutor">
            <h2>Nuevo autor</h2>
            <label>Nombre</label>
            <input type="text" id="nombre" required>
            <label>Nacionalidad</label>
            <input type="text" id="nacionalidad" required>
            <button type="submit">Guardar</button>
        </form>`;

    document.getElementById("formAutor").addEventListener("submit", async function (evento) {
        evento.preventDefault();
        const autor = {
            nombre: document.getElementById("nombre").value,
            nacionalidad: document.getElementById("nacionalidad").value
        };
        await crearAutor(autor);
        mostrarAutores();
    });
}

/**
 * Muestra el formulario de edición con los datos precargados.
 */
async function mostrarFormularioEditar(id) {
    const autor = await obtenerAutorPorId(id);

    contenido.innerHTML = `
        <form id="formAutor">
            <h2>Editar autor</h2>
            <label>Nombre</label>
            <input type="text" id="nombre" value="${autor.nombre}" required>
            <label>Nacionalidad</label>
            <input type="text" id="nacionalidad" value="${autor.nacionalidad}" required>
            <button type="submit">Actualizar</button>
        </form>`;

    document.getElementById("formAutor").addEventListener("submit", async function (evento) {
        evento.preventDefault();
        const autorActualizado = {
            nombre: document.getElementById("nombre").value,
            nacionalidad: document.getElementById("nacionalidad").value
        };
        await actualizarAutor(id, autorActualizado);
        mostrarAutores();
    });
}

/**
 * Muestra el detalle de un autor en modo solo lectura.
 */
async function mostrarDetalle(id) {
    const autor = await obtenerAutorPorId(id);

    contenido.innerHTML = `
        <div class="tarjeta">
            <div class="tarjeta-info">
                <h2>${autor.nombre}</h2>
                <p><strong>Nacionalidad:</strong> ${autor.nacionalidad}</p>
                <p><strong>ID:</strong> ${autor.id}</p>
            </div>
        </div>
        <button class="btn-nuevo" id="btnVolver">Volver</button>`;

    document.getElementById("btnVolver").addEventListener("click", mostrarAutores);
}

/**
 * Elimina un autor tras confirmar.
 */
async function borrar(id) {
    const confirmado = confirm("¿Seguro que quieres borrar este autor?");
    if (confirmado === true) {
        await eliminarAutor(id);
        mostrarAutores();
    }
}