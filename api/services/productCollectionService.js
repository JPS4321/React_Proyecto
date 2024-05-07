import conn from "../connection.js";

export async function getAllProductCollections() {
  try {
    const [rows] = await conn.query("SELECT * FROM ProductoColecciones");
    return rows;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getProductCollectionById(id_producto, id_coleccion) {
  try {
    const [rows] = await conn.query(
      "SELECT * FROM ProductoColecciones WHERE id_producto = ? AND id_coleccion = ?",
      [id_producto, id_coleccion]
    );
    return rows[0] || null;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function createProductCollection(id_producto, id_coleccion) {
  try {
    const [result] = await conn.query(
      "INSERT INTO ProductoColecciones (id_producto, id_coleccion) VALUES (?, ?)",
      [id_producto, id_coleccion]
    );
    return { success: true, result };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}

export async function deleteProductCollection(id_producto, id_coleccion) {
  try {
    await conn.query(
      "DELETE FROM ProductoColecciones WHERE id_producto = ? AND id_coleccion = ?",
      [id_producto, id_coleccion]
    );
  } catch (e) {
    console.log(e);
    return e;
  }
}
