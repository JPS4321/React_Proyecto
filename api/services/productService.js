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
    try {
        await conn.query(
            'UPDATE DivinoSeas_Productos SET nombre = ?, descripcion = ?, precio = ?, id_categoria = ?, imagen = ?, secondimage = ?, cantidad_xs = ?, cantidad_s = ?, cantidad_m = ?, cantidad_l = ?, id_color = ?, id_coleccion = ?, id_promocion = ? WHERE id_producto = ?',
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
                id_producto,
            ]
        );

        return { success: true, message: 'Producto actualizado exitosamente' };
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
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
