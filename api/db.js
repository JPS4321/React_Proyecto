import conn from './connection.js'

export async function getAllProductos() {
    try {
        const [rows] = await conn.query('SELECT * FROM DivinoSeas_Productos')
        return rows;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export async function getProductoById(id) {
    try {
        const [rows] = await conn.query('SELECT * FROM DivinoSeas_Productos WHERE id = ?', [id])
        return rows[0] || null;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export async function createProducto(nombre, descripcion, picture, existencias) {
    try {
        const [result] = await conn.query('INSERT INTO DivinoSeas_Productos (nombre, descripcion, picture, existencias) VALUES (?, ?, ?, ?)', [nombre, descripcion, picture, existencias]);
        return { success: true, result };
    } catch (e) {
        console.log(e);
        return { success: false, error: e };
    }
}

export async function updateProducto(id, nombre, descripcion, picture, existencias) {
    try {
        const [result] = await conn.query('UPDATE DivinoSeas_Productos SET nombre = ?, descripcion = ?, picture = ?, existencias = ? WHERE id = ?', [nombre, descripcion, picture, existencias, id]);
        return result;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export async function deleteProducto(id) {
    try {
        await conn.query('DELETE FROM DivinoSeas_Productos WHERE id = ?', [id]);
    } catch (e) {
        console.log(e);
        return e;
    }
}
