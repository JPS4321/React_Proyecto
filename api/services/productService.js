import conn from '../connection.js';

export async function getAllProductos() {
    try {
        const [rows] = await conn.query('SELECT * FROM DivinoSeas_Productos');
        return rows;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export async function getProductoById(id_producto) {
    try {
        const [rows] = await conn.query('SELECT * FROM DivinoSeas_Productos WHERE id_producto = ?', [id_producto]);
        return rows[0] || null;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export async function createProducto(nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l) {
    try {
        const [result] = await conn.query(
            'INSERT INTO DivinoSeas_Productos (nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [nombre, descripcion, precio, id_categoria, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l]
        );
        return { success: true, result };
    } catch (e) {
        console.log(e);
        return { success: false, error: e };
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
