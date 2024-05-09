Documentación API de Gestión de Promociones de Productos
========================================================

Introducción
------------

Esta API permite la gestión de asociaciones entre productos y promociones, facilitando operaciones para añadir, consultar y eliminar promociones vinculadas a productos específicos. Ideal para sistemas de comercio electrónico que gestionan ofertas y descuentos en sus productos.

Endpoints
---------

### Obtener todas las relaciones Producto-Promoción

-   URL: `/producto-promociones`
-   Método: `GET`
-   Descripción: Devuelve una lista de todas las relaciones entre productos y promociones registradas en el sistema.
-   Respuesta:
    -   200 OK: Solicitud exitosa.

    ```json
        [
          {
            "id_producto": 101,
            "id_promocion": 5
          },
          {
            "id_producto": 102,
            "id_promocion": 8
          }
        ]
    ```

### Obtener una relación Producto-Promoción por IDs

-   URL: `/producto-promociones/:idProducto/:idPromocion`
-   Método: `GET`
-   Descripción: Devuelve detalles específicos de una relación Producto-Promoción utilizando los IDs del producto y la promoción.
-   Parámetros URL:
    -   `idProducto` - ID del producto.
    -   `idPromocion` - ID de la promoción.
-   Respuesta:
    -   200 OK: Solicitud exitosa.

    ```json
        {
          "id_producto": 101,
          "id_promocion": 5
        }
    ```

    -   404 Not Found: Relación Producto-Promoción no encontrada.

    ```json
        {
          "error": "Relación Producto-Promoción no encontrada"
        }
    ```

### Crear una nueva relación Producto-Promoción

-   URL: `/producto-promociones`
-   Método: `POST`
-   Descripción: Crea una nueva relación entre un producto y una promoción.
-   Parámetros Body:
    -   `id_producto` - ID del producto.
    -   `id_promocion` - ID de la promoción.
-   Respuesta:
    -   201 Created: Relación creada con éxito.

    ```json
        {
          "message": "Relación Producto-Promoción creada con éxito",
          "id_producto": "ID del producto",
          "id_promocion": "ID de la promoción"
        }
    ```

    -   500 Internal Server Error: Error al crear la relación.

    ```json
        {
          "error": "Descripción del error"
        }
    ```

### Eliminar una relación Producto-Promoción

-   URL: `/producto-promociones/:idProducto/:idPromocion`
-   Método: `DELETE`
-   Descripción: Elimina una relación Producto-Promoción especificada por los IDs del producto y de la promoción.
-   Parámetros URL:
    -   `idProducto` - ID del producto.
    -   `idPromocion` - ID de la promoción.
-   Respuesta:
    -   204 No Content: Relación eliminada con éxito.