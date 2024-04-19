# Documentación API de Colores de Productos

## Introducción

Esta API permite la gestión de la relación entre productos y colores, facilitando operaciones para añadir, obtener y eliminar colores asociados a productos específicos. Es ideal para sistemas de comercio electrónico que requieran gestionar la disponibilidad de productos en varios colores.

## Endpoints

### Añadir color a un producto

- **URL**: `/productos/:productId/colors/:colorId`
- **Método**: `POST`
- **Descripción**: Asocia un color a un producto específico.
- **Parámetros URL**:
  - `productId` - ID del producto.
  - `colorId` - ID del color.
- **Respuesta**:
  - **201 Created**: Color añadido con éxito.
    ```json
    {
      "message": "Color añadido al producto con éxito"
    }
    ```

### Obtener colores de un producto

- **URL**: `/productos/:productId/colors`
- **Método**: `GET`
- **Descripción**: Devuelve una lista de colores asociados a un producto específico.
- **Parámetros URL**:
  - `productId` - ID del producto.
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

### Obtener productos por color

- **URL**: `/productos/colors/:colorId/products`
- **Método**: `GET`
- **Descripción**: Devuelve una lista de productos que están disponibles en un color específico.
- **Parámetros URL**:
  - `colorId` - ID del color.
- **Respuesta**:
  - **200 OK**: Solicitud exitosa.
    ```json
    [
      {
        "id_producto": 1,
        "nombre": "Bikini",
        "descripcion": "Bikini bonito",
        "precio": 19.99
      }
    ]
    ```

### Eliminar color de un producto

- **URL**: `/productos/:productId/colors/:colorId`
- **Método**: `DELETE`
- **Descripción**: Elimina la asociación de un color a un producto específico.
- **Parámetros URL**:
  - `productId` - ID del producto.
  - `colorId` - ID del color.
- **Respuesta**:
  - **200 OK**: Color eliminado con éxito.
    ```json
    {
      "message": "Color eliminado del producto con éxito"
    }
    ```
