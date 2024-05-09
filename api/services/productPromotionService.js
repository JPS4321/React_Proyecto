import conn from "../connection.js";

export async function getAllProductPromotions() {
  try {
    const [rows] = await conn.query("SELECT * FROM ProductoPromocion");
    return rows;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getProductPromotionById(id_producto, id_promocion) {
  try {
    const [rows] = await conn.query(
      "SELECT * FROM ProductoPromocion WHERE id_producto = ? AND id_promocion = ?",
      [id_producto, id_promocion]
    );
    return rows[0] || null;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function createProductPromotion(id_producto, id_promocion) {
  try {
    const [result] = await conn.query(
      "INSERT INTO ProductoPromocion (id_producto, id_promocion) VALUES (?, ?)",
      [id_producto, id_promocion]
    );
    return { success: true, result };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}

export async function deleteProductPromotion(id_producto, id_promocion) {
  try {
    await conn.query(
      "DELETE FROM ProductoPromocion WHERE id_producto = ? AND id_promocion = ?",
      [id_producto, id_promocion]
    );
  } catch (e) {
    console.log(e);
    return e;
  }
}
