Documentación API de Gestión de Órdenes
=======================================

Introducción
------------

Esta API es crucial para la gestión de órdenes en un entorno de comercio electrónico. Permite realizar operaciones básicas como la creación, consulta, actualización y eliminación de órdenes, facilitando el seguimiento y manejo eficiente de pedidos de los clientes.

Endpoints
---------

### Obtener todas las órdenes

-   URL: `/ordenes`
-   Método: `GET`
-   Descripción: Devuelve una lista de todas las órdenes registradas en el sistema.
-   Respuesta:
    -   200 OK: Solicitud exitosa.

    ```json
        [
          {
            "id_orden": 1,
            "estado": "Procesando",
            "id_cliente": 45
          },
          {
            "id_orden": 2,
            "estado": "Enviado",
            "id_cliente": 78
          }
        ]
    ```

### Obtener una orden por ID

-   URL: `/ordenes/:id`
-   Método: `GET`
-   Descripción: Devuelve los detalles de una orden específica, identificada por su ID.
-   Parámetros URL:
    -   `id` - ID de la orden.
-   Respuesta:
    -   200 OK: Solicitud exitosa.

    ```json
        {
          "id_orden": 1,
          "estado": "Procesando",
          "id_cliente": 45
        }
    ```

    -   404 Not Found: Orden no encontrada.

    ```json
        {
          "error": "Orden no encontrada"
        }
    ```

### Crear una nueva orden

-   URL: `/ordenes`
-   Método: `POST`
-   Descripción: Crea una nueva orden.
-   Parámetros Body:
    -   `estado` - Estado de la orden (p. ej., "Procesando", "Enviado").
    -   `id_cliente` - ID del cliente que realiza la orden.
-   Respuesta:
    -   201 Created: Orden creada con éxito.

    ```json
        `{
          "message": "Orden creada con éxito",
          "id_orden": "ID de la nueva orden"
        }
    ```

    -   500 Internal Server Error: Error al crear la orden.

    ```json
        {
          "error": "Descripción del error"
        }
    ```

### Actualizar una orden existente

-   URL: `/ordenes/:id`
-   Método: `PUT`
-   Descripción: Actualiza el estado de una orden existente.
-   Parámetros URL:
    -   `id` - ID de la orden a actualizar.
-   Parámetros Body:
    -   `estado` - Nuevo estado de la orden.
-   Respuesta:
    -   200 OK: Orden actualizada con éxito.

    ```json
        {
          "message": "Orden actualizada con éxito"
        }
    ```

    -   404 Not Found: Orden no encontrada para actualizar.

    ```json
        {
          "error": "Orden no encontrada para actualizar"
        }
    ```

### Eliminar una orden

-   URL: `/ordenes/:id`
-   Método: `DELETE`
-   Descripción: Elimina una orden especificada por su ID.
-   Parámetros URL:
    -   `id` - ID de la orden a eliminar.
-   Respuesta:
    -   204 No Content: Orden eliminada con éxito.