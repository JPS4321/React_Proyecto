# Documentación API de Colecciones

## Introducción

Esta API permite la gestión de colecciones, facilitando operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las colecciones en la base de datos. Es ideal para sistemas que necesitan gestionar grupos de elementos o productos agrupados temáticamente.

## Endpoints

### Obtener todas las colecciones

- **URL**: `/colecciones`
- **Método**: `GET`
- **Descripción**: Devuelve una lista de todas las colecciones disponibles.
- **Respuesta**:
  - **200 OK**: Solicitud exitosa.
    ```json
    [
      {
        "id_coleccion": 1,
        "nombre": "Primavera 2024",
        "descripcion": "Colección de ropa de primavera para el año 2024"
      },
      {
        "id_coleccion": 2,
        "nombre": "Deportiva",
        "descripcion": "Colección de ropa deportiva"
      }
    ]
    ```

### Obtener una colección por ID

- **URL**: `/colecciones/:id`
- **Método**: `GET`
- **Descripción**: Devuelve los detalles de una colección específica por su ID.
- **Parámetros URL**:
  - `id` - ID de la colección.
- **Respuesta**:
  - **200 OK**: Colección encontrada.
    ```json
    {
      "id_coleccion": 1,
      "nombre": "Primavera 2024",
      "descripcion": "Colección de ropa de primavera para el año 2024"
    }
    ```

### Crear una nueva colección

- **URL**: `/colecciones`
- **Método**: `POST`
- **Descripción**: Crea una nueva colección con los datos proporcionados.
- **Cuerpo de la solicitud**:
  ```json
  {
    "nombre": "Verano 2024",
    "descripcion": "Colección de ropa de verano para el año 2024"
  }
  ```
- **Respuesta**:
    - **201 Created**: Colección creada con éxito.
     ```json
    {
        "message": "Colección creada con éxito",
        "id_coleccion": 3
    }
    ``` 
### Actualizar una colección existente

- **URL**: `/colecciones/:id`
- **Método**: `PUT`
- **Descripción**: Actualiza los detalles de una colección existente.
- **Parámetros URL**:
    - `id` - ID de la colección.
- **Cuerpo de la solicitud**:
    ```json
    {
        "nombre": "Primavera Avanzada 2024",
        "descripcion": "Colección actualizada de ropa de primavera para el año 2024"
    }
    ``` 
- **Respuesta**:
    - **200 OK**: Colección actualizada con éxito.
    ```json
    {
        "message": "Colección actualizada con éxito"
    }
    ``` 

### Eliminar una colección

- **URL**: `/colecciones/:id`
- **Método**: `DELETE`
- **Descripción**: Elimina una colección existente.
- **Parámetros URL**:
    - `id` - ID de la colección.
- **Respuesta**:
    - **200 OK**: Colección eliminada con éxito.
    ```json
    {
        "message": "Colección eliminada con éxito"
    }
    ``` 