import { API_URL } from "../config.js";

const URL = `${API_URL}/libros`;

/**
 * Obtiene la lista completa de libros.
 */
export async function obtenerLibros() {
    const respuesta = await fetch(URL);
    return respuesta.json();
}

/**
 * Obtiene un libro por su id.
 */
export async function obtenerLibroPorId(id) {
    const respuesta = await fetch(`${URL}/${id}`);
    return respuesta.json();
}

/**
 * Crea un nuevo libro.
 */
export async function crearLibro(libro) {
    const respuesta = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(libro)
    });
    return respuesta.json();
}

/**
 * Actualiza un libro existente.
 */
export async function actualizarLibro(id, libro) {
    const respuesta = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(libro)
    });
    return respuesta.json();
}

/**
 * Elimina un libro por su id.
 */
export async function eliminarLibro(id) {
    await fetch(`${URL}/${id}`, {
        method: "DELETE"
    });
}