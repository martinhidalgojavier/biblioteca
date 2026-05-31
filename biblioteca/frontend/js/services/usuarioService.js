import { API_URL } from "../config.js";

const URL = `${API_URL}/usuarios`;

/**
 * Obtiene la lista completa de usuarios.
 */
export async function obtenerUsuarios() {
    const respuesta = await fetch(URL);
    return respuesta.json();
}

/**
 * Obtiene un usuario por su id.
 */
export async function obtenerUsuarioPorId(id) {
    const respuesta = await fetch(`${URL}/${id}`);
    return respuesta.json();
}

/**
 * Crea un nuevo usuario.
 */
export async function crearUsuario(usuario) {
    const respuesta = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });
    return respuesta.json();
}

/**
 * Actualiza un usuario existente.
 */
export async function actualizarUsuario(id, usuario) {
    const respuesta = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });
    return respuesta.json();
}

/**
 * Elimina un usuario por su id.
 */
export async function eliminarUsuario(id) {
    await fetch(`${URL}/${id}`, {
        method: "DELETE"
    });
}