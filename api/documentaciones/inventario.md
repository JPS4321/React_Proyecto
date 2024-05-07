# Documentación API de Gestión de Inventarios de Bikinis

## Introducción

Esta API proporciona una interfaz para gestionar el inventario de bikinis, permitiendo operaciones como consultar, crear, actualizar y eliminar registros de inventario. Es especialmente útil para tiendas en línea que necesitan mantener un control preciso sobre el stock de sus productos.

## Endpoints

### Obtener todos los inventarios

- URL: `/inventarios`
- Método: `GET`
- Descripción: Obtiene una lista de todos los registros de inventario disponibles.
- Respuesta:

  - 200 OK: Solicitud exitosa.

  ````json
      [
        {
          "id_inventario": 1,
          "cantidad": 150,
          "id_producto": 101,
          "nombre_producto": "Bikini Tropical"
        },
        {
          "id_inventario": 2,
          "cantidad": 85,
          "id_producto": 102,
          "nombre_producto": "Bikini Clásico"
        }
      ]
      ```

### Obtener un inventario por ID

- URL: `/inventarios/:id`
- Método: `GET`
- Descripción: Devuelve detalles específicos de un inventario utilizando su ID.
- Parámetros URL:
  - `id` - ID del inventario.
- Respuesta:

  - 200 OK: Solicitud exitosa.

    ```json
    {
        "id_inventario": 1,
        "cantidad": 150,
        "id_producto": 101,
        "nombre_producto": "Bikini Tropical"
    }
    ```

  - 404 Not Found: Inventario no encontrado.

    ```json
    {
        "error": "Inventario no encontrado"
    }
    ```

### Crear un nuevo inventario

- URL: `/inventarios`
- Método: `POST`
- Descripción: Crea un nuevo registro de inventario.
- Parámetros Body:
  - `cantidad` - Cantidad de unidades a registrar.
  - `id_producto` - ID del producto (bikini) asociado.
- Respuesta:

  - 201 Created: Inventario creado con éxito.

    ```json
    {
        "message": "Inventario creado con éxito",
        "id_inventario": "ID asignado al nuevo inventario"
    }
    ```

  - 500 Internal Server Error: Error al crear el inventario.

    ```json
    {
        "error": "Descripción del error"
    }
    ```

### Actualizar un inventario existente

- URL: `/inventarios/:id`
- Método: `PUT`
- Descripción: Actualiza la cantidad de un inventario existente.
- Parámetros URL:
  - `id` - ID del inventario a actualizar.
- Parámetros Body:
  - `cantidad` - Nueva cantidad a registrar.
- Respuesta:

  - 200 OK: Inventario actualizado con éxito.

    ```json
    {
        "message": "Inventario actualizado con éxito"
    }
    ```
  - 404 Not Found: Inventario no encontrado para actualizar.

    ```json
    {
        "error": "Inventario no encontrado para actualizar"
    }
    ```

### Eliminar un inventario

- URL: `/inventarios/:id`
- Método: `DELETE`
- Descripción: Elimina un registro de inventario especificado por su ID.
- Parámetros URL:
  - `id` - ID del inventario a eliminar.
- Respuesta:
  - 204 No Content: Inventario eliminado con éxito.
