import conn from "../connection.js";

export async function getAllOrderDetails() {
  try {
    const [rows] = await conn.query("SELECT * FROM OrdenDetalles");
    return rows;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getOrderDetailById(id_ordenDetalle) {
  try {
    const [rows] = await conn.query(
      "SELECT * FROM OrdenDetalles WHERE id_ordenDetalle = ?",
      [id_ordenDetalle]
    );
    return rows[0] || null;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function createOrderDetail(
  cantidad,
  precioPorUnidad,
  id_orden,
  id_producto
) {
  try {
    const [result] = await conn.query(
      "INSERT INTO OrdenDetalles (cantidad, precioPorUnidad, id_orden, id_producto) VALUES (?, ?, ?, ?)",
      [cantidad, precioPorUnidad, id_orden, id_producto]
    );
    return { success: true, result };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}

export async function updateOrderDetail(
  id_ordenDetalle,
  cantidad,
  precioPorUnidad,
  id_orden,
  id_producto
) {
  try {
    const [result] = await conn.query(
      "UPDATE OrdenDetalles SET cantidad = ?, precioPorUnidad = ?, id_orden = ?, id_producto = ? WHERE id_ordenDetalle = ?",
      [cantidad, precioPorUnidad, id_orden, id_producto, id_ordenDetalle]
    );
    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function deleteOrderDetail(id_ordenDetalle) {
  try {
    await conn.query("DELETE FROM OrdenDetalles WHERE id_ordenDetalle = ?", [
      id_ordenDetalle,
    ]);
  } catch (e) {
    console.log(e);
    return e;
  }
}
