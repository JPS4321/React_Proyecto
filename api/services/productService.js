import conn from '../connection.js';

function convertirABase64(buffer, tipoImagen = 'image/jpeg') {
    return buffer && Buffer.isBuffer(buffer)
        ? `data:${tipoImagen};base64,${buffer.toString('base64')}`
        : null;
}

export async function getAllProductos() {
    try {
        const [rows] = await conn.query('SELECT * FROM DivinoSeas_Productos');
        const productos = rows.map(producto => ({
            ...producto,
            imagen: convertirABase64(producto.imagen),
            secondimage: convertirABase64(producto.secondimage),
        }));
        return productos;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getProductoById(id_producto) {
    console.log("getProductoById llamado con id_producto:", id_producto);

    try {
        const [rows] = await conn.query(`
            SELECT 
                p.*, 
                c.nombre AS nombre_categoria, 
                col.nombre AS nombre_coleccion, 
                clr.nombre AS nombre_color,
                promo.descripcion AS nombre_promocion 
            FROM DivinoSeas_Productos p
            LEFT JOIN Categorias c ON p.id_categoria = c.id_categoria
            LEFT JOIN Colores clr ON p.id_color = clr.id_color
            LEFT JOIN Colecciones col ON p.id_coleccion = col.id_coleccion
            LEFT JOIN Promociones promo ON p.id_promocion = promo.id_promocion
            WHERE p.id_producto = ?
        `, [id_producto]);

        if (rows.length > 0) {
            const producto = {
                id_producto: rows[0].id_producto,
                nombre: rows[0].nombre,
                descripcion: rows[0].descripcion,
                precio: rows[0].precio,
                imagen: convertirABase64(rows[0].imagen),
                secondimage: convertirABase64(rows[0].secondimage),
                cantidad_xs: rows[0].cantidad_xs,
                cantidad_s: rows[0].cantidad_s,
                cantidad_m: rows[0].cantidad_m,
                cantidad_l: rows[0].cantidad_l,
                id_categoria: rows[0].id_categoria,
                nombre_categoria: rows[0].nombre_categoria,
                id_color: rows[0].id_color,
                nombre_color: rows[0].nombre_color,
                id_coleccion: rows[0].id_coleccion,
                nombre_coleccion: rows[0].nombre_coleccion,
                id_promocion: rows[0].id_promocion,
                nombre_promocion: rows[0].nombre_promocion,
            };

            console.log("Producto completo:", producto);
            return producto;
        } else {
            console.log("No se encontró el producto con id:", id_producto);
            return null;
        }
    } catch (e) {
        console.error("Error en getProductoById:", e);
        return e;
    }
}

export async function createProducto(
    nombre,
    descripcion,
    precio,
    id_categoria,
    imagen,
    secondimage,
    cantidad_xs,
    cantidad_s,
    cantidad_m,
    cantidad_l,
    id_color,
    id_coleccion,
    id_promocion
) {
    console.log('Datos recibidos para crear producto:', {
        nombre,
        descripcion,
        precio,
        id_categoria,
        id_color,
        id_coleccion,
        id_promocion,
    });

    try {
        const [result] = await conn.query(
            'INSERT INTO DivinoSeas_Productos (nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l, id_color, id_coleccion, id_promocion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                nombre,
                descripcion,
                precio,
                id_categoria,
                imagen,
                secondimage,
                cantidad_xs,
                cantidad_s,
                cantidad_m,
                cantidad_l,
                id_color || null,
                id_coleccion || null,
                id_promocion || null,
            ]
        );

        const id_producto = result.insertId;
        if (!id_producto) {
            throw new Error('No se pudo obtener el ID del producto insertado.');
        }

        return { success: true, message: 'Producto creado exitosamente', id_producto };
    } catch (error) {
        console.error('Error al crear el producto:', error);
        return { success: false, error };
    }
}

export async function updateProducto(
  id_producto,
  nombre,
  descripcion,
  precio,
  id_categoria,
  id_color,
  id_coleccion,
  id_promocion,
  imagen,
  secondimage,
  cantidad_xs,
  cantidad_s,
  cantidad_m,
  cantidad_l,
  id_user // ID del usuario que realiza la actualización
) {
  try {
    // Obtener el producto actual para comparar las cantidades
    const [existingProduct] = await conn.query(
      "SELECT cantidad_xs, cantidad_s, cantidad_m, cantidad_l FROM DivinoSeas_Productos WHERE id_producto = ?",
      [id_producto]
    );

    // Lista de ajustes (suma/resta de cantidades por talla)
    const adjustments = [];
    if (existingProduct[0].cantidad_xs !== cantidad_xs) {
      adjustments.push({ accion: cantidad_xs > existingProduct[0].cantidad_xs ? "suma" : "resta", cantidad: Math.abs(cantidad_xs - existingProduct[0].cantidad_xs), size: "XS" });
    }
    if (existingProduct[0].cantidad_s !== cantidad_s) {
      adjustments.push({ accion: cantidad_s > existingProduct[0].cantidad_s ? "suma" : "resta", cantidad: Math.abs(cantidad_s - existingProduct[0].cantidad_s), size: "S" });
    }
    if (existingProduct[0].cantidad_m !== cantidad_m) {
      adjustments.push({ accion: cantidad_m > existingProduct[0].cantidad_m ? "suma" : "resta", cantidad: Math.abs(cantidad_m - existingProduct[0].cantidad_m), size: "M" });
    }
    if (existingProduct[0].cantidad_l !== cantidad_l) {
      adjustments.push({ accion: cantidad_l > existingProduct[0].cantidad_l ? "suma" : "resta", cantidad: Math.abs(cantidad_l - existingProduct[0].cantidad_l), size: "L" });
    }

    // Actualizar el producto en la base de datos
    let query = `UPDATE DivinoSeas_Productos SET nombre = ?, descripcion = ?, precio = ?, id_categoria = ?, id_color = ?, id_coleccion = ?, id_promocion = ?, cantidad_xs = ?, cantidad_s = ?, cantidad_m = ?, cantidad_l = ?`;
    const params = [nombre, descripcion, precio, id_categoria, id_color, id_coleccion, id_promocion, cantidad_xs, cantidad_s, cantidad_m, cantidad_l];

    if (imagen !== undefined && imagen !== null) {
      query += `, imagen = ?`;
      params.push(imagen);
    }

    if (secondimage !== undefined && secondimage !== null) {
      query += `, secondimage = ?`;
      params.push(secondimage);
    }

    query += ` WHERE id_producto = ?`;
    params.push(id_producto);

    await conn.query(query, params);

    // Registrar los ajustes en la tabla de auditoría directamente
    for (const adjustment of adjustments) {
      if (adjustment.cantidad > 0) { // Solo registrar si la cantidad es mayor a 0
        console.log("Insertando en InventoryAudit:", {
          id_user,
          accion: adjustment.accion,
          id_producto,
          cantidad: adjustment.cantidad,
          size: adjustment.size,
          fecha: new Date()
        });

        await conn.query(
          `INSERT INTO InventoryAudit (id_user, accion, id_producto, cantidad, size, fecha) VALUES (?, ?, ?, ?, ?, ?)`,
          [id_user, adjustment.accion, id_producto, adjustment.cantidad, adjustment.size, new Date()]
        );
      }
    }

    return { success: true, message: "Producto actualizado exitosamente" };
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return { success: false, error };
  }
}


export async function deleteProducto(id_producto) {
    try {
        await conn.query('DELETE FROM DivinoSeas_Productos WHERE id_producto = ?', [id_producto]);
        return { success: true, message: 'Producto eliminado exitosamente' };
    } catch (e) {
        console.error('Error al eliminar el producto:', e);
        return { success: false, error: e };
    }
}
