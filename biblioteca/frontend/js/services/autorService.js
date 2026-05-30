import { API_URL } from "../config.js";

const URL = `${API_URL}/autores`;

/**
 * Obtiene la lista completa de autores.
 */
export async function obtenerAutores() {
    const respuesta = await fetch(URL);
    return respuesta.json();
}

/**
 * Obtiene un autor por su id.
 */
export async function obtenerAutorPorId(id) {
    const respuesta = await fetch(`${URL}/${id}`);
    return respuesta.json();
}

/**
 * Crea un nuevo autor.
 */
export async function crearAutor(autor) {
    const respuesta = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(autor)
    });
    return respuesta.json();
}

/**
 * Actualiza un autor existente.
 */
export async function actualizarAutor(id, autor) {
    const respuesta = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(autor)
    });
    return respuesta.json();
}

/**
 * Elimina un autor por su id.
 */
export async function eliminarAutor(id) {
    await fetch(`${URL}/${id}`, {
        method: "DELETE"
    });
}