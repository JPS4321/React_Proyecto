Documentación API de Gestión de Colecciones de Productos
========================================================

Introducción
------------

Esta API permite la gestión de la relación entre productos y colecciones, facilitando operaciones para añadir, obtener y eliminar relaciones entre productos y colecciones específicas. Es ideal para sistemas de comercio electrónico que requieran gestionar agrupaciones de productos.

Endpoints
---------

### Obtener todas las relaciones Producto-Colección

-   URL: `/producto-colecciones`
-   Método: `GET`
-   Descripción: Devuelve todas las relaciones entre productos y colecciones registradas en el sistema.
-   Respuesta:
    -   200 OK: Solicitud exitosa.

        json

        Copy code

        `[
          {
            "id_producto": 1,
            "id_coleccion": 10
          },
          {
            "id_producto": 2,
            "id_coleccion": 15
          }
        ]`

### Obtener una relación Producto-Colección por ID

-   URL: `/producto-colecciones/:idProducto/:idColeccion`
-   Método: `GET`
-   Descripción: Devuelve detalles específicos de una relación Producto-Colección utilizando los IDs de producto y colección.
-   Parámetros URL:
    -   `idProducto` - ID del producto.
    -   `idColeccion` - ID de la colección.
-   Respuesta:
    -   200 OK: Solicitud exitosa.

        json

        Copy code

        `{
          "id_producto": 1,
          "id_coleccion": 10
        }`

### Crear una nueva relación Producto-Colección

-   URL: `/producto-colecciones`
-   Método: `POST`
-   Descripción: Crea una nueva relación entre un producto y una colección.
-   Parámetros Body:
    -   `id_producto` - ID del producto.
    -   `id_coleccion` - ID de la colección.
-   Respuesta:
    -   201 Created: Relación creada con éxito.

        json

        Copy code

        `{
          "success": true,
          "message": "Relación Producto-Coleccion creada con éxito",
          "id_producto": "ID del producto",
          "id_coleccion": "ID de la colección"
        }`

    -   500 Internal Server Error: Error al crear la relación.

        json

        Copy code

        `{
          "success": false,
          "message": "Error al crear la relación",
          "error": "Descripción del error"
        }`

### Eliminar una relación Producto-Colección

-   URL: `/producto-colecciones/:idProducto/:idColeccion`
-   Método: `DELETE`
-   Descripción: Elimina una relación Producto-Colección especificada por los IDs del producto y de la colección.
-   Parámetros URL:
    -   `idProducto` - ID del producto.
    -   `idColeccion` - ID de la colección.
-   Respuesta:
    -   204 No Content: Relación eliminada con éxito.