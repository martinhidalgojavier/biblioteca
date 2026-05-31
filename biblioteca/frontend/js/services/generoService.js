import { API_URL } from "../config.js";

const URL = `${API_URL}/generos`;

/**
 * Obtiene la lista completa de géneros.
 */
export async function obtenerGeneros() {
    const respuesta = await fetch(URL);
    return respuesta.json();
}

/**
 * Obtiene un género por su id.
 */
export async function obtenerGeneroPorId(id) {
    const respuesta = await fetch(`${URL}/${id}`);
    return respuesta.json();
}

/**
 * Crea un nuevo género.
 */
export async function crearGenero(genero) {
    const respuesta = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genero)
    });
    return respuesta.json();
}

/**
 * Actualiza un género existente.
 */
export async function actualizarGenero(id, genero) {
    const respuesta = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genero)
    });
    return respuesta.json();
}

/**
 * Elimina un género por su id.
 */
export async function eliminarGenero(id) {
    await fetch(`${URL}/${id}`, {
        method: "DELETE"
    });
}