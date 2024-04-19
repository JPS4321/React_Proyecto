# Documentación API de Clientes

## Introducción

Esta API permite la gestión de clientes, facilitando operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los registros de clientes en la base de datos. Es ideal para sistemas que necesitan gestionar información de clientes de manera eficiente.

## Endpoints

### Obtener todos los clientes

- **URL**: `/clientes`
- **Método**: `GET`
- **Descripción**: Devuelve una lista de todos los clientes registrados.
- **Respuesta**:
  - **200 OK**: Solicitud exitosa.
    ```json
    [
      {
        "id_cliente": 1,
        "nombre": "Juan Pérez",
        "email": "juan.perez@example.com",
        "direccion": "123 Calle Falsa, Ciudad Ficticia",
        "contra": "contraseña"
      },
      {
        "id_cliente": 2,
        "nombre": "Ana Gómez",
        "email": "ana.gomez@example.com",
        "direccion": "456 Calle Verdadera, Ciudad Real",
        "contra": "contraseña"
      }
    ]
    ```

### Obtener un cliente por ID

- **URL**: `/clientes/:id`
- **Método**: `GET`
- **Descripción**: Devuelve los detalles de un cliente específico por su ID.
- **Parámetros URL**:
  - `id` - ID del cliente.
- **Respuesta**:
  - **200 OK**: Cliente encontrado.
    ```json
    {
      "id_cliente": 1,
      "nombre": "Juan Pérez",
      "email": "juan.perez@example.com",
      "direccion": "123 Calle Falsa, Ciudad Ficticia",
      "contra": "contraseña"
    }
    ```

### Crear un nuevo cliente

- **URL**: `/clientes`
- **Método**: `POST`
- **Descripción**: Crea un nuevo cliente con los datos proporcionados.
- **Cuerpo de la solicitud**:
  ```json
  {
    "nombre": "Laura Martínez",
    "email": "laura.mtz@example.com",
    "direccion": "789 Calle Imaginaria, Ciudad Nueva",
    "contra": "contraseña"
  }
  ```
- **Respuesta**:
    - **201 Created**: Cliente creado con éxito.
    ```json
    {
        "message": "Cliente creado con éxito",
        "id_cliente": 3
    }
    ```   

### Actualizar un cliente existente

- **URL**: `/clientes/:id`
- **Método**: `PUT`
- **Descripción**: Actualiza los detalles de un cliente existente.
- **Parámetros URL**:
    - `id` - ID del cliente.
- **Cuerpo de la solicitud**:
    ```json
    {
        "nombre": "Juan Pérez Jr.",
        "email": "juan.perez.jr@example.com",
        "direccion": "123 Calle Falsa, Ciudad Ficticia",
        "contra": "nuevaContraseña"
    }
    ```  
- **Respuesta**:
    - **200 OK**: Cliente actualizado con éxito.
    ```json
    {
        "message": "Cliente actualizado con éxito"
    }
    ```

### Eliminar un cliente

- **URL**: `/clientes/:id`
- **Método**: `DELETE`
- **Descripción**: Elimina un cliente existente.
- **Parámetros URL**:
    - `id` - ID del cliente.
- **Respuesta**:
    - **200 OK**: Cliente eliminado con éxito.
    ```json
    {
        "message": "Cliente eliminado con éxito"
    }
    ```