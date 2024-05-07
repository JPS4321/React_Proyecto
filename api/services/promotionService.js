import conn from "../connection.js";

export async function getAllPromotions() {
  try {
    const [rows] = await conn.query("SELECT * FROM Promociones");
    return rows;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getPromotionById(id_promocion) {
  try {
    const [rows] = await conn.query(
      "SELECT * FROM Promociones WHERE id_promocion = ?",
      [id_promocion]
    );
    return rows[0] || null;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function createPromotion(
  descripcion,
  descuento,
  fechaInicio,
  fechaFin
) {
  try {
    const [result] = await conn.query(
      "INSERT INTO Promociones (descripcion, descuento, fechaInicio, fechaFin) VALUES (?, ?, ?, ?)",
      [descripcion, descuento, fechaInicio, fechaFin]
    );
    return { success: true, result };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}

export async function updatePromotion(
  id_promocion,
  descripcion,
  descuento,
  fechaInicio,
  fechaFin
) {
  try {
    const [result] = await conn.query(
      "UPDATE Promociones SET descripcion = ?, descuento = ?, fechaInicio = ?, fechaFin = ? WHERE id_promocion = ?",
      [descripcion, descuento, fechaInicio, fechaFin, id_promocion]
    );
    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function deletePromotion(id_promocion) {
  try {
    await conn.query("DELETE FROM Promociones WHERE id_promocion = ?", [
      id_promocion,
    ]);
  } catch (e) {
    console.log(e);
    return e;
  }
}
