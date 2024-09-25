import conn from '../connection.js';

function convertirABase64(buffer) {
    return buffer ? buffer.toString('base64') : null;
}

export async function getAllProductos() {
    try {
        const [rows] = await conn.query('SELECT * FROM DivinoSeas_Productos');
        // Convertir las imágenes y secondimage a base64
        const productos = rows.map(producto => {
            return {
                ...producto,
                imagen: convertirABase64(producto.imagen),
                secondimage: convertirABase64(producto.secondimage),
            };
        });
        return productos;
    } catch (e) {
        console.log(e);
        return e;
    }
}


export async function getProductoById(id_producto) {
    try {
        const [rows] = await conn.query('SELECT * FROM DivinoSeas_Productos WHERE id_producto = ?', [id_producto]);
        if (rows.length > 0) {
            const producto = rows[0];
            // Convertir las imágenes y secondimage a base64
            return {
                ...producto,
                imagen: convertirABase64(producto.imagen),
                secondimage: convertirABase64(producto.secondimage),
            };
        }
        return null;
    } catch (e) {
        console.log(e);
        return e;
    }
}

import conn from '../connection.js';

export async function createProducto(nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l, colores, colecciones, promociones) {
  const connection = await conn.getConnection(); // Obtener la conexión para poder manejar transacciones
  try {
    // Iniciar transacción
    await connection.beginTransaction();
    
    // Inserción del producto en la tabla `DivinoSeas_Productos`
    const [result] = await connection.query(
      'INSERT INTO DivinoSeas_Productos (nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l]
    );
    const id_producto = result.insertId; // Obtener el ID del producto recién creado

    // Insertar colores en la tabla `ProductoColores`
    if (colores && colores.length > 0) {
      const colorValues = colores.map(id_color => [id_producto, id_color]);
      await connection.query('INSERT INTO ProductoColores (id_producto, id_color) VALUES ?', [colorValues]);
    }

    // Insertar colecciones en la tabla `ProductoColecciones`
    if (colecciones && colecciones.length > 0) {
      const coleccionValues = colecciones.map(id_coleccion => [id_producto, id_coleccion]);
      await connection.query('INSERT INTO ProductoColecciones (id_producto, id_coleccion) VALUES ?', [coleccionValues]);
    }

    // Insertar promociones en la tabla `ProductoPromocion`
    if (promociones && promociones.length > 0) {
      const promocionValues = promociones.map(id_promocion => [id_producto, id_promocion]);
      await connection.query('INSERT INTO ProductoPromocion (id_producto, id_promocion) VALUES ?', [promocionValues]);
    }

    // Si todo sale bien, confirmar la transacción
    await connection.commit();
    return { success: true, message: 'Producto creado exitosamente', id_producto };
  } catch (error) {
    // Si ocurre algún error, hacer rollback
    await connection.rollback();
    console.error('Error al crear el producto:', error);
    return { success: false, error };
  } finally {
    connection.release(); // Liberar la conexión
  }
}


export async function updateProducto(id_producto, nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l) {
    try {
        const [result] = await conn.query(
            'UPDATE DivinoSeas_Productos SET nombre = ?, descripcion = ?, precio = ?, id_categoria = ?, imagen = ?, secondimage = ?, cantidad_xs = ?, cantidad_s = ?, cantidad_m = ?, cantidad_l = ? WHERE id_producto = ?',
            [nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l, id_producto]
        );
        return result;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export async function deleteProducto(id_producto) {
    try {
        await conn.query('DELETE FROM DivinoSeas_Productos WHERE id_producto = ?', [id_producto]);
    } catch (e) {
        console.log(e);
        return e;
    }
}
