import { mostrarAutores } from "./views/autorView.js";

const botonesNav = document.querySelectorAll("nav button");

/**
 * Conecta cada botón del menú con su vista correspondiente.
 */
botonesNav.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const vista = boton.dataset.vista;
        cargarVista(vista);
    });
});

/**
 * Carga la vista solicitada en la zona de contenido.
 */
function cargarVista(vista) {
    if (vista === "autores") {
        mostrarAutores();
    }
}

// Al arrancar la aplicación se muestra la vista de autores por defecto.
mostrarAutores();