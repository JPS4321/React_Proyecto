# Documentación API de Productos

## Introducción

Esta API gestiona operaciones relacionadas con productos, permitiendo crear, leer, actualizar y eliminar productos de una base de datos. Es ideal para sistemas que requieren una administración efectiva de información sobre productos.

## Endpoints

### Obtener todos los productos

- **URL**: `/productos`
- **Método**: `GET`
- **Descripción**: Devuelve una lista de todos los productos disponibles.
- **Respuesta**:
  - **200 OK**: Solicitud exitosa.
    ```json
    [
      {
        "id": 101,
        "nombre": "Bikini Tropical",
        "descripcion": "Bikini de dos piezas con estampado tropical vibrante",
        "picture": "url_to_picture_of_tropical_bikini.jpg",
        "existencias": 150
      },
      {
        "id": 102,
        "nombre": "Bikini de corte alto",
        "descripcion": "Bikini de corte alto en color negro sólido, ideal para la playa",
        "picture": "url_to_picture_of_high_cut_bikini.jpg",
        "existencias": 75
      }
    ]
    ```

### Obtener un producto por ID

- **URL**: `/productos/:id`
- **Método**: `GET`
- **Descripción**: Devuelve los detalles de un producto específico por su ID.
- **Parámetros URL**:
  - `id` - ID del producto.
- **Respuesta**:
  - **200 OK**: Producto encontrado.
    ```json
    {
      "id": 101,
      "nombre": "Bikini Tropical",
      "descripcion": "Bikini de dos piezas con estampado tropical vibrante",
      "picture": "url_to_picture_of_tropical_bikini.jpg",
      "existencias": 150
    }
    ```

### Crear un nuevo producto

- **URL**: `/productos`
- **Método**: `POST`
- **Descripción**: Crea un nuevo producto con los datos proporcionados.
- **Cuerpo de la solicitud**:
  ```json
  {
    "nombre": "Bikini Halter",
    "descripcion": "Bikini halter con detalles de encaje",
    "picture": "url_to_picture_of_halter_bikini.jpg",
    "existencias": 200
  }
  ```
- **Respuesta**:
  - **201 Created**: Producto creado con éxito
    ```json
    {
      "success": true,
      "message": "Producto creado con éxito",
      "productId": 105
    }
    ```
### Actualizar un producto existente
- **URL**: `/productos/:id`
- **Método**: `PUT`
- **Descripción**: Actualiza los detalles de un producto existente.
- **Parámetros URL**:
  - `id` - ID del producto.
- **Cuerpo de la solicitud**:
  ```json
  {
      "nombre": "Bikini Tropical Actualizado",
      "descripcion": "Bikini de dos piezas con nuevo estampado tropical",
      "picture": "url_to_updated_picture_of_tropical_bikini.jpg",
      "existencias": 120
  }
   ```
- **Respuesta**:
  - **200 OK**: Producto actualizado con éxito.
    ```json
    {
    "success": true,
    "message": "Producto actualizado con éxito",
    "productId": 101
    }
     ```
### Eliminar un producto

- **URL**: `/productos/:id`
- **Método**: `DELETE`
- **Descripción**: Elimina un producto existente.
- **Parámetros URL**:
    - `id` - ID del producto.
- **Respuesta**:
    - **204 No Content**: Producto eliminado correctamente.
