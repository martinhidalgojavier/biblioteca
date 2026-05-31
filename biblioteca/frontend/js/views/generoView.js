import {
    obtenerGeneros,
    obtenerGeneroPorId,
    crearGenero,
    actualizarGenero,
    eliminarGenero
} from "../services/generoService.js";

const contenido = document.getElementById("contenido");

/**
 * Muestra el listado completo de géneros con sus botones de acción.
 */
export async function mostrarGeneros() {
    const generos = await obtenerGeneros();

    let html = `<button class="btn-nuevo" id="btnNuevoGenero">+ Nuevo género</button>`;

    if (generos.length === 0) {
        html += `<p>No hay géneros registrados.</p>`;
    } else {
        generos.forEach(function (genero) {
            html += `
                <div class="tarjeta">
                    <div class="tarjeta-info">
                        <h3>${genero.nombre}</h3>
                    </div>
                    <div class="acciones">
                        <button class="btn-ver" data-id="${genero.id}">Ver</button>
                        <button class="btn-editar" data-id="${genero.id}">Editar</button>
                        <button class="btn-borrar" data-id="${genero.id}">Borrar</button>
                    </div>
                </div>`;
        });
    }

    contenido.innerHTML = html;

    document.getElementById("btnNuevoGenero").addEventListener("click", mostrarFormularioNuevo);

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
 * Muestra el formulario para crear un género nuevo.
 */
function mostrarFormularioNuevo() {
    contenido.innerHTML = `
        <form id="formGenero">
            <h2>Nuevo género</h2>
            <label>Nombre</label>
            <input type="text" id="nombre" required>
            <button type="submit">Guardar</button>
        </form>`;

    document.getElementById("formGenero").addEventListener("submit", async function (evento) {
        evento.preventDefault();
        const genero = {
            nombre: document.getElementById("nombre").value
        };
        await crearGenero(genero);
        mostrarGeneros();
    });
}

/**
 * Muestra el formulario de edición con los datos precargados.
 */
async function mostrarFormularioEditar(id) {
    const genero = await obtenerGeneroPorId(id);

    contenido.innerHTML = `
        <form id="formGenero">
            <h2>Editar género</h2>
            <label>Nombre</label>
            <input type="text" id="nombre" value="${genero.nombre}" required>
            <button type="submit">Actualizar</button>
        </form>`;

    document.getElementById("formGenero").addEventListener("submit", async function (evento) {
        evento.preventDefault();
        const generoActualizado = {
            nombre: document.getElementById("nombre").value
        };
        await actualizarGenero(id, generoActualizado);
        mostrarGeneros();
    });
}

/**
 * Muestra el detalle de un género en modo solo lectura.
 */
async function mostrarDetalle(id) {
    const genero = await obtenerGeneroPorId(id);

    contenido.innerHTML = `
        <div class="tarjeta">
            <div class="tarjeta-info">
                <h2>${genero.nombre}</h2>
                <p><strong>ID:</strong> ${genero.id}</p>
            </div>
        </div>
        <button class="btn-nuevo" id="btnVolver">Volver</button>`;

    document.getElementById("btnVolver").addEventListener("click", mostrarGeneros);
}

/**
 * Elimina un género tras confirmar.
 */
async function borrar(id) {
    const confirmado = confirm("¿Seguro que quieres borrar este género?");
    if (confirmado === true) {
        await eliminarGenero(id);
        mostrarGeneros();
    }
}
