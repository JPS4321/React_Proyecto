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
            imagen: convertirABase64(producto.imagen)
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
            LEFT JOIN ProductoColores pc ON p.id_producto = pc.id_producto
            LEFT JOIN Colores clr ON pc.id_color = clr.id_color
            LEFT JOIN ProductoColecciones pcl ON p.id_producto = pcl.id_producto
            LEFT JOIN Colecciones col ON pcl.id_coleccion = col.id_coleccion
            LEFT JOIN ProductoPromocion pp ON p.id_producto = pp.id_producto
            LEFT JOIN Promociones promo ON pp.id_promocion = promo.id_promocion
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
                categoria: rows[0].nombre_categoria,
                colores: [],
                colecciones: [],
                promociones: []
            };

            rows.forEach(row => {
                if (row.nombre_color && !producto.colores.includes(row.nombre_color)) {
                    producto.colores.push(row.nombre_color);
                }
                if (row.nombre_coleccion && !producto.colecciones.includes(row.nombre_coleccion)) {
                    producto.colecciones.push(row.nombre_coleccion);
                }
                if (row.nombre_promocion && !producto.promociones.includes(row.nombre_promocion)) {
                    producto.promociones.push(row.nombre_promocion);
                }
            });

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

export async function createProducto(nombre, descripcion, precio, categoriaNombre, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l, colores, colecciones, promociones) {
    colores = colores ? (Array.isArray(colores) ? colores : colores.split(',').map(Number)) : [];
    colecciones = colecciones ? (Array.isArray(colecciones) ? colecciones : colecciones.split(',').map(Number)) : [];
    promociones = promociones ? (Array.isArray(promociones) ? promociones : promociones.split(',').map(Number)) : [];

    console.log('Datos recibidos para crear producto:', { nombre, descripcion, precio, categoriaNombre, colores, colecciones, promociones });

    const connection = await conn.getConnection();
    try {
        await connection.beginTransaction();

        const [categoriaRows] = await connection.query('SELECT id_categoria FROM Categorias WHERE id_categoria = ?', [categoriaNombre]);
        if (categoriaRows.length === 0) {
            throw new Error(`Categoría no encontrada: ${categoriaNombre}`);
        }
        const id_categoria = categoriaRows[0].id_categoria;

        const [result] = await connection.query(
            'INSERT INTO DivinoSeas_Productos (nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l]
        );

        const id_producto = result.insertId;
        if (!id_producto) {
            throw new Error('No se pudo obtener el ID del producto insertado.');
        }

        if (colores.length > 0) {
            console.log('Insertando colores:', colores);
            const colorValues = colores.map(id_color => [id_producto, id_color]);
            await connection.query('INSERT INTO ProductoColores (id_producto, id_color) VALUES ?', [colorValues]);
        }

        if (colecciones.length > 0) {
            console.log('Insertando colecciones:', colecciones);
            const coleccionValues = colecciones.map(id_coleccion => [id_producto, id_coleccion]);
            await connection.query('INSERT INTO ProductoColecciones (id_producto, id_coleccion) VALUES ?', [coleccionValues]);
        }

        if (promociones.length > 0) {
            console.log('Insertando promociones:', promociones);
            const promocionValues = promociones.map(id_promocion => [id_producto, id_promocion]);
            await connection.query('INSERT INTO ProductoPromocion (id_producto, id_promocion) VALUES ?', [promocionValues]);
        }

        await connection.commit();
        return { success: true, message: 'Producto creado exitosamente', id_producto };
    } catch (error) {
        await connection.rollback();
        console.error('Error al crear el producto:', error);
        return { success: false, error };
    } finally {
        connection.release();
    }
}

export async function updateProducto(id_producto, nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l, colores, colecciones, promociones) {
    colores = colores ? (Array.isArray(colores) ? colores : colores.split(',').map(Number)) : [];
    colecciones = colecciones ? (Array.isArray(colecciones) ? colecciones : colecciones.split(',').map(Number)) : [];
    promociones = promociones ? (Array.isArray(promociones) ? promociones : promociones.split(',').map(Number)) : [];

    const connection = await conn.getConnection();
    try {
        await connection.beginTransaction();

        await connection.query(
            'UPDATE DivinoSeas_Productos SET nombre = ?, descripcion = ?, precio = ?, id_categoria = ?, imagen = ?, secondimage = ?, cantidad_xs = ?, cantidad_s = ?, cantidad_m = ?, cantidad_l = ? WHERE id_producto = ?',
            [nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l, id_producto]
        );

        await connection.query('DELETE FROM ProductoColores WHERE id_producto = ?', [id_producto]);
        await connection.query('DELETE FROM ProductoColecciones WHERE id_producto = ?', [id_producto]);
        await connection.query('DELETE FROM ProductoPromocion WHERE id_producto = ?', [id_producto]);

        if (colores.length > 0) {
            const colorValues = colores.map(id_color => [id_producto, id_color]);
            await connection.query('INSERT INTO ProductoColores (id_producto, id_color) VALUES ?', [colorValues]);
        }

        if (colecciones.length > 0) {
            const coleccionValues = colecciones.map(id_coleccion => [id_producto, id_coleccion]);
            await connection.query('INSERT INTO ProductoColecciones (id_producto, id_coleccion) VALUES ?', [coleccionValues]);
        }

        if (promociones.length > 0) {
            const promocionValues = promociones.map(id_promocion => [id_producto, id_promocion]);
            await connection.query('INSERT INTO ProductoPromocion (id_producto, id_promocion) VALUES ?', [promocionValues]);
        }

        await connection.commit();
        return { success: true, message: 'Producto actualizado exitosamente' };
    } catch (error) {
        await connection.rollback();
        console.error('Error al actualizar el producto:', error);
        return { success: false, error };
    } finally {
        connection.release();
    }
}

export async function deleteProducto(id_producto) {
    try {
        await conn.query('DELETE FROM DivinoSeas_Productos WHERE id_producto = ?', [id_producto]);
    } catch (e) {
        console.error(e);
        return e;
    }
}
