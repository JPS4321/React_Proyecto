Documentación API de Gestión de Promociones
===========================================

Introducción
------------

Esta API facilita la gestión de promociones en una tienda de comercio electrónico, permitiendo operaciones para añadir, obtener, actualizar y eliminar promociones. Es ideal para tiendas que desean ofrecer descuentos y promociones especiales a sus clientes de manera eficiente.

Endpoints
---------

### Obtener todas las promociones

-   URL: `/promociones`
-   Método: `GET`
-   Descripción: Devuelve una lista de todas las promociones disponibles en la plataforma.
-   Respuesta:
    -   200 OK: Solicitud exitosa.

    ```json
        [
          {
            "id_promocion": 1,
            "descripcion": "Descuento de verano",
            "descuento": 20,
            "fechaInicio": "2024-06-01",
            "fechaFin": "2024-08-31"
          },
          {
            "id_promocion": 2,
            "descripcion": "Promoción de lanzamiento",
            "descuento": 15,
            "fechaInicio": "2024-09-01",
            "fechaFin": "2024-09-15"
          }
        ]
    ```

### Obtener una promoción por ID

-   URL: `/promociones/:id`
-   Método: `GET`
-   Descripción: Devuelve los detalles de una promoción específica, identificada por su ID.
-   Parámetros URL:
    -   `id` - ID de la promoción.
-   Respuesta:
    -   200 OK: Solicitud exitosa.

    ```json
        {
          "id_promocion": 1,
          "descripcion": "Descuento de verano",
          "descuento": 20,
          "fechaInicio": "2024-06-01",
          "fechaFin": "2024-08-31"
        }
    ```

    -   404 Not Found: Promoción no encontrada.

    ```json
        {
          "error": "Promoción no encontrada"
        }
    ```

### Crear una nueva promoción

-   URL: `/promociones`
-   Método: `POST`
-   Descripción: Crea una nueva promoción.
-   Parámetros Body:
    -   `descripcion` - Descripción de la promoción.
    -   `descuento` - Porcentaje de descuento.
    -   `fechaInicio` - Fecha de inicio de la promoción.
    -   `fechaFin` - Fecha de fin de la promoción.
-   Respuesta:
    -   201 Created: Promoción creada con éxito.

    ```json
        {
          "message": "Promoción creada con éxito",
          "id_promocion": "ID de la nueva promoción"
        }
    ```

    -   500 Internal Server Error: Error al crear la promoción.

    ```json
        {
          "error": "Descripción del error"
        }
    ```

### Actualizar una promoción existente

-   URL: `/promociones/:id`
-   Método: `PUT`
-   Descripción: Actualiza los detalles de una promoción existente.
-   Parámetros URL:
    -   `id` - ID de la promoción a actualizar.
-   Parámetros Body:
    -   `descripcion` - Nueva descripción de la promoción.
    -   `descuento` - Nuevo porcentaje de descuento.
    -   `fechaInicio` - Nueva fecha de inicio de la promoción.
    -   `fechaFin` - Nueva fecha de fin de la promoción.
-   Respuesta:
    -   200 OK: Promoción actualizada con éxito.

    ```json
        {
          "message": "Promoción actualizada con éxito"
        }
    ```

    -   404 Not Found: Promoción no encontrada para actualizar.

    ```json
        {
          "error": "Promoción no encontrada para actualizar"
        }
    ```

### Eliminar una promoción

-   URL: `/promociones/:id`
-   Método: `DELETE`
-   Descripción: Elimina una promoción especificada por su ID.
-   Parámetros URL:
    -   `id` - ID de la promoción a eliminar.
-   Respuesta:
    -   204 No Content: Promoción eliminada con éxito.