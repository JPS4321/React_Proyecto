Documentación API de Gestión de Detalles de Órdenes
===================================================

Introducción
------------

Esta API permite la administración detallada de cada ítem dentro de las órdenes de un sistema de comercio electrónico, abarcando operaciones para añadir, obtener, actualizar y eliminar detalles de órdenes. Estas funcionalidades son cruciales para manejar aspectos específicos de cada producto en una orden.

Endpoints
---------

### Obtener todos los detalles de órdenes

-   URL: `/orden-detalles`
-   Método: `GET`
-   Descripción: Devuelve una lista de todos los detalles de las órdenes registradas en el sistema.
-   Respuesta:
    -   200 OK: Solicitud exitosa.

    ```json
        [
          {
            "id_ordenDetalle": 1,
            "cantidad": 2,
            "precioPorUnidad": 29.99,
            "id_orden": 100,
            "id_producto": 101
          },
          {
            "id_ordenDetalle": 2,
            "cantidad": 1,
            "precioPorUnidad": 49.99,
            "id_orden": 101,
            "id_producto": 102
          }
        ]
    ```

### Obtener un detalle de orden por ID

-   URL: `/orden-detalles/:id`
-   Método: `GET`
-   Descripción: Devuelve los detalles específicos de un detalle de orden utilizando su ID.
-   Parámetros URL:
    -   `id` - ID del detalle de orden.
-   Respuesta:
    -   200 OK: Solicitud exitosa.

    ```json
        {
          "id_ordenDetalle": 1,
          "cantidad": 2,
          "precioPorUnidad": 29.99,
          "id_orden": 100,
          "id_producto": 101
        }
    ```

    -   404 Not Found: Detalle de orden no encontrado.

    ```json
        {
          "error": "Detalle de orden no encontrado"
        }
    ```

### Crear un nuevo detalle de orden

-   URL: `/orden-detalles`
-   Método: `POST`
-   Descripción: Crea un nuevo detalle de orden.
-   Parámetros Body:
    -   `cantidad` - Cantidad del producto.
    -   `precioPorUnidad` - Precio por unidad del producto.
    -   `id_orden` - ID de la orden asociada.
    -   `id_producto` - ID del producto ordenado.
-   Respuesta:
    -   201 Created: Detalle de orden creado con éxito.

    ```json
        {
          "message": "Detalle de orden creado con éxito",
          "id_ordenDetalle": "ID del nuevo detalle de orden"
        }
    ```

    -   500 Internal Server Error: Error al crear el detalle de la orden.

    ```json
        {
          "error": "Descripción del error"
        }
    ```

### Actualizar un detalle de orden existente

-   URL: `/orden-detalles/:id`
-   Método: `PUT`
-   Descripción: Actualiza la información de un detalle de orden existente.
-   Parámetros URL:
    -   `id` - ID del detalle de orden a actualizar.
-   Parámetros Body:
    -   `cantidad` - Nueva cantidad del producto.
    -   `precioPorUnidad` - Nuevo precio por unidad.
    -   `id_orden` - ID de la orden asociada.
    -   `id_producto` - ID del producto.
-   Respuesta:
    -   200 OK: Detalle de orden actualizado con éxito.

    ```json
        {
          "message": "Detalle de orden actualizado con éxito"
        }
    ```

    -   404 Not Found: Detalle de orden no encontrado para actualizar.

    ```json
        {
          "error": "Detalle de orden no encontrado para actualizar"
        }
    ```

### Eliminar un detalle de orden

-   URL: `/orden-detalles/:id`
-   Método: `DELETE`
-   Descripción: Elimina un detalle de orden especificado por su ID.
-   Parámetros URL:
    -   `id` - ID del detalle de orden a eliminar.
-   Respuesta:
    -   204 No Content: Detalle de orden eliminado con éxito.