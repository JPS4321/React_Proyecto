# Documentación API de Colores

## Introducción

Esta API permite la gestión de colores, facilitando realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los colores en la base de datos. Es ideal para sistemas que necesiten manejar una paleta de colores de manera dinámica.

## Endpoints

### Obtener todos los colores

- **URL**: `/colores`
- **Método**: `GET`
- **Descripción**: Devuelve una lista de todos los colores disponibles.
- **Respuesta**:
  - **200 OK**: Solicitud exitosa.
    ```json
    [
      {
        "id_color": 1,
        "nombre": "Rojo"
      },
      {
        "id_color": 2,
        "nombre": "Azul"
      }
    ]
    ```

### Obtener un color por ID

- **URL**: `/colores/:id`
- **Método**: `GET`
- **Descripción**: Devuelve los detalles de un color específico por su ID.
- **Parámetros URL**:
  - `id` - ID del color.
- **Respuesta**:
  - **200 OK**: Color encontrado.
    ```json
    {
      "id_color": 1,
      "nombre": "Rojo"
    }
    ```

### Crear un nuevo color

- **URL**: `/colores`
- **Método**: `POST`
- **Descripción**: Crea un nuevo color con los datos proporcionados.
- **Cuerpo de la solicitud**:
  ```json
  {
    "nombre": "Verde"
  }
  ```
- **Respuesta**:
    - **201 Created**: Color creado con éxito
    ```json
    {
        "message": "Color creado con éxito",
        "id_color": 3
    }
    ```    

### Actualizar un color existente
- **URL**: `/colores/:id`
- **Método**: `PUT`
- **Descripción**: Actualiza los detalles de un color existente.
- **Parámetros URL**:
    - `id` - ID del color.
- **Cuerpo de la solicitud**:
     ```json
    {
        "nombre": "Verde Esmeralda"
    }
    ```    
- **Respuesta**:
    - **200 OK**: Color actualizado con éxito.
     ```json
    {
        "message": "Color actualizado con éxito"
    }
    ```  

### Eliminar un color
- **URL**: `/colores/:id`
- **Método**: `DELETE`
- **Descripción**: Elimina un color existente.
- **Parámetros URL**:
    - `id` - ID del color.
- **Respuesta**:
    - **200 OK**: Color eliminado con éxito.
    ```json
    {
        "message": "Color eliminado con éxito"
    }
    ``` 

