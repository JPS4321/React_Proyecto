# Documentación API de Categorías

## Introducción

Esta API facilita la gestión de categorías dentro de un sistema, permitiendo realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las categorías en la base de datos. Es ideal para sistemas que requieren una gestión dinámica de categorías.

## Endpoints

### Obtener todas las categorías

- **URL**: `/categorias`
- **Método**: `GET`
- **Descripción**: Devuelve una lista de todas las categorías disponibles.
- **Respuesta**:
  - **200 OK**: Solicitud exitosa.
    ```json
    [
      {
        "id_categoria": 1,
        "nombre": "Bikinis",
        "descripcion": "Bikinis bonitos"
      },
      {
        "id_categoria": 2,
        "nombre": "Enteros",
        "descripcion": "Trajes de baño de una pieza"
      }
    ]
    ```

### Obtener una categoría por ID

- **URL**: `/categorias/:id`
- **Método**: `GET`
- **Descripción**: Devuelve los detalles de una categoría específica por su ID.
- **Parámetros URL**:
  - `id` - ID de la categoría.
- **Respuesta**:
  - **200 OK**: Categoría encontrada.
    ```json
    {
      "id_categoria": 1,
      "nombre": "Bikinis",
      "descripcion": "Bikinis bonitos"
    }
    ```

### Crear una nueva categoría

- **URL**: `/categorias`
- **Método**: `POST`
- **Descripción**: Crea una nueva categoría con los datos proporcionados.
- **Cuerpo de la solicitud**:
  ```json
  {
    "nombre": "Bikinis enteros",
    "descripcion": "Nuevos bikinis enteros"
  }
  ```
- **Respuesta**:
  - **201 Created**: Categoría creada con éxito.
  ```json
  {
    "success": true,
    "message": "Categoría creada con éxito",
    "id_categoria": 3
  }
  ```

### Actualizar una categoría existente

- **URL**: `/categorias/:id`
- **Método**: `PUT`
- **Descripción**: Actualiza los detalles de una categoría existente.
- **Parámetros URL**:
  - `id` - ID de la categoría.
- **Cuerpo de la solicitud**:
  ```json
  {
    "nombre": "Bikinis Enteros",
    "descripcion": "Nuevos Bikinis enteros"
  }
  ```
- **Respuesta**:
    - **200 OK**: Categoría actualizada con éxito.
    ```json
    {
    "success": true,
    "message": "Categoría actualizada con éxito"
    }
    ```
### Eliminar una categoría
- **URL**: `/categorias/:id`
- **Método**: `DELETE`
- **Descripción**: Elimina una categoría existente.
- **Parámetros URL**:
    - `id` - ID de la categoría.
- **Respuesta**:
    - **200 OK**: Categoría eliminada con éxito.
    ```json
    {
    "success": true,
    "message": "Categoría eliminada con éxito"
    }
    ```
    
