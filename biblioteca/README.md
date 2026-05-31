# 📚 Biblioteca — Aplicación Full Stack

Aplicación web completa para la gestión de una biblioteca, desarrollada como proyecto final del primer curso. Consta de un **backend REST en Java con Spring Boot** y un **frontend en JavaScript puro** (sin frameworks) que consume la API mediante `fetch()`.

El dominio gestiona cuatro entidades —**Autor, Género, Libro y Usuario**— con sus relaciones, ofreciendo un CRUD completo sobre cada una.

ENLACE YOUTUBE: https://youtu.be/meKkHX9o0Lk
---

## 🧩 Modelo de dominio

| Entidad | Atributos principales | Relaciones |
| --- | --- | --- |
| **Autor** | nombre, nacionalidad | 1 : N con Libro |
| **Libro** | título, año de publicación | N : 1 con Autor · N : M con Género |
| **Género** | nombre | N : M con Libro |
| **Usuario** | nombre, email | N : M con Libro (libros prestados) |

- **One-to-Many:** un autor tiene muchos libros.
- **Many-to-Many:** un libro pertenece a varios géneros, y un usuario puede tener prestados varios libros.

---

## ⚙️ Requisitos del sistema

- **Java 21** o superior.
- **Maven** (no es necesario instalarlo: el proyecto incluye el *Maven Wrapper* `mvnw`).
- Un navegador moderno.
- Extensión **Live Server** de VS Code (o cualquier servidor estático) para el frontend.

---

## 🚀 Cómo ejecutar la aplicación

### 1. Backend

Desde la carpeta raíz del proyecto:

```bash
./mvnw spring-boot:run
```

El servidor arranca en **http://localhost:8080**.

Al iniciarse, una clase `DataLoader` inserta automáticamente datos de prueba (autores, géneros, libros y usuarios) generados con **Java Faker**, por lo que la base de datos nunca está vacía.

### 2. Frontend

Abre el archivo `frontend/index.html` con **Live Server** (botón *Go Live* en VS Code). Se abrirá en el navegador (normalmente en `http://127.0.0.1:5500`).

> El backend debe estar arrancado para que el frontend funcione.

---

## 🗄️ Base de datos H2

Se utiliza una base de datos **H2 en memoria**. La consola web está habilitada para inspeccionar los datos en tiempo real.

- **URL de la consola:** http://localhost:8080/h2-console
- **JDBC URL:** `jdbc:h2:mem:biblioteca`
- **Usuario:** `sa`
- **Contraseña:** *(vacía)*

> Al detener la aplicación los datos se pierden (base de datos en memoria), y se vuelven a generar al arrancar de nuevo.

---

## 🌐 Rutas de la API REST

Todas las rutas cuelgan de `/api/v1/`. El patrón es idéntico para las cuatro entidades (`autores`, `generos`, `libros`, `usuarios`).

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/v1/autores` | Lista todos los autores |
| `GET` | `/api/v1/autores/{id}` | Detalle de un autor |
| `POST` | `/api/v1/autores` | Crea un autor |
| `PUT` | `/api/v1/autores/{id}` | Actualiza un autor |
| `DELETE` | `/api/v1/autores/{id}` | Elimina un autor |

Las mismas operaciones están disponibles para:

- `/api/v1/generos`
- `/api/v1/libros`
- `/api/v1/usuarios`

### Ejemplo de cuerpo para crear un libro (POST)

```json
{
  "titulo": "Cien años de soledad",
  "anioPublicacion": 1967,
  "autor": { "id": 1 },
  "generos": [ { "id": 2 }, { "id": 3 } ]
}
```

### Ejemplo de cuerpo para crear un usuario con libros prestados (POST)

```json
{
  "nombre": "Ana López",
  "email": "ana@correo.com",
  "librosPrestados": [ { "id": 1 }, { "id": 4 } ]
}
```

---

## 🧪 Pruebas

El proyecto incluye **pruebas unitarias con JUnit 5 y Mockito** para la capa de servicios de las cuatro entidades. Para ejecutarlas:

```bash
./mvnw test
```

---

## 🏗️ Arquitectura

El backend sigue una arquitectura por capas, sin acceso directo del controlador al repositorio:

```
controller  →  service  →  repository  →  (model)
```

- **model:** entidades JPA (`Autor`, `Genero`, `Libro`, `Usuario`).
- **repository:** interfaces que extienden `JpaRepository`.
- **service:** lógica de negocio.
- **controller:** exposición de los endpoints REST.
- **config:** clase `DataLoader` para la carga inicial de datos.

El frontend está organizado en módulos por responsabilidad:

```
frontend/
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── config.js          # URL base de la API
    ├── app.js             # navegación principal
    ├── services/          # llamadas fetch a la API (una por entidad)
    └── views/             # renderizado y eventos de cada entidad
```

---

## 📄 Documentación JavaDoc

La documentación técnica generada con JavaDoc se encuentra en la carpeta `/docs`. Para consultarla, abre `docs/index.html` en el navegador.

---

## 👤 Autor

Javier Martín Hidalgo — Proyecto final del primer curso de Desarrollo de Aplicaciones Multiplataforma.