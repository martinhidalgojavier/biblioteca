import {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "../services/usuarioService.js";
import { obtenerLibros } from "../services/libroService.js";

const contenido = document.getElementById("contenido");

/**
 * Muestra el listado completo de usuarios con sus botones de acción.
 */
export async function mostrarUsuarios() {
    const usuarios = await obtenerUsuarios();

    let html = `<button class="btn-nuevo" id="btnNuevoUsuario">+ Nuevo usuario</button>`;

    if (usuarios.length === 0) {
        html += `<p>No hay usuarios registrados.</p>`;
    } else {
        usuarios.forEach(function (usuario) {
            html += `
                <div class="tarjeta">
                    <div class="tarjeta-info">
                        <h3>${usuario.nombre}</h3>
                        <span>${usuario.email}</span>
                    </div>
                    <div class="acciones">
                        <button class="btn-ver" data-id="${usuario.id}">Ver</button>
                        <button class="btn-editar" data-id="${usuario.id}">Editar</button>
                        <button class="btn-borrar" data-id="${usuario.id}">Borrar</button>
                    </div>
                </div>`;
        });
    }

    contenido.innerHTML = html;

    document.getElementById("btnNuevoUsuario").addEventListener("click", mostrarFormularioNuevo);

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
 * Construye los checkboxes de libros, marcando los ya prestados.
 */
function construirCheckboxesLibros(libros, idsSeleccionados) {
    let checkboxes = "";
    libros.forEach(function (libro) {
        let marcado = "";
        if (idsSeleccionados.includes(libro.id) === true) {
            marcado = "checked";
        }
        checkboxes += `
            <label>
                <input type="checkbox" class="checkLibro" value="${libro.id}" ${marcado}>
                ${libro.titulo}
            </label>`;
    });
    return checkboxes;
}

/**
 * Recoge los ids de los libros marcados en el formulario.
 */
function recogerLibrosSeleccionados() {
    const libros = [];
    document.querySelectorAll(".checkLibro").forEach(function (check) {
        if (check.checked === true) {
            libros.push({ id: Number(check.value) });
        }
    });
    return libros;
}

/**
 * Muestra el formulario para crear un usuario nuevo.
 */
async function mostrarFormularioNuevo() {
    const libros = await obtenerLibros();

    contenido.innerHTML = `
        <form id="formUsuario">
            <h2>Nuevo usuario</h2>
            <label>Nombre</label>
            <input type="text" id="nombre" required>
            <label>Email</label>
            <input type="email" id="email" required>
            <label>Libros prestados</label>
            <div class="checkbox-grupo">${construirCheckboxesLibros(libros, [])}</div>
            <button type="submit">Guardar</button>
        </form>`;

    document.getElementById("formUsuario").addEventListener("submit", async function (evento) {
        evento.preventDefault();
        const usuario = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            librosPrestados: recogerLibrosSeleccionados()
        };
        await crearUsuario(usuario);
        mostrarUsuarios();
    });
}

/**
 * Muestra el formulario de edición con los datos precargados.
 */
async function mostrarFormularioEditar(id) {
    const usuario = await obtenerUsuarioPorId(id);
    const libros = await obtenerLibros();

    const idsLibros = [];
    usuario.librosPrestados.forEach(function (libro) {
        idsLibros.push(libro.id);
    });

    contenido.innerHTML = `
        <form id="formUsuario">
            <h2>Editar usuario</h2>
            <label>Nombre</label>
            <input type="text" id="nombre" value="${usuario.nombre}" required>
            <label>Email</label>
            <input type="email" id="email" value="${usuario.email}" required>
            <label>Libros prestados</label>
            <div class="checkbox-grupo">${construirCheckboxesLibros(libros, idsLibros)}</div>
            <button type="submit">Actualizar</button>
        </form>`;

    document.getElementById("formUsuario").addEventListener("submit", async function (evento) {
        evento.preventDefault();
        const usuarioActualizado = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            librosPrestados: recogerLibrosSeleccionados()
        };
        await actualizarUsuario(id, usuarioActualizado);
        mostrarUsuarios();
    });
}

/**
 * Muestra el detalle de un usuario en modo solo lectura.
 */
async function mostrarDetalle(id) {
    const usuario = await obtenerUsuarioPorId(id);

    let listaLibros = "Ninguno";
    if (usuario.librosPrestados.length > 0) {
        listaLibros = usuario.librosPrestados.map(function (libro) {
            return libro.titulo;
        }).join(", ");
    }

    contenido.innerHTML = `
        <div class="tarjeta">
            <div class="tarjeta-info">
                <h2>${usuario.nombre}</h2>
                <p><strong>Email:</strong> ${usuario.email}</p>
                <p><strong>Libros prestados:</strong> ${listaLibros}</p>
                <p><strong>ID:</strong> ${usuario.id}</p>
            </div>
        </div>
        <button class="btn-nuevo" id="btnVolver">Volver</button>`;

    document.getElementById("btnVolver").addEventListener("click", mostrarUsuarios);
}

/**
 * Elimina un usuario tras confirmar.
 */
async function borrar(id) {
    const confirmado = confirm("¿Seguro que quieres borrar este usuario?");
    if (confirmado === true) {
        await eliminarUsuario(id);
        mostrarUsuarios();
    }
}