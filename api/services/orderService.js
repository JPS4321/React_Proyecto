import conn from "../connection.js";

export async function getAllOrders() {
  try {
    const [rows] = await conn.query("SELECT * FROM Ordenes");
    return rows;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getOrderById(id_orden) {
  try {
    const [rows] = await conn.query(
      "SELECT * FROM Ordenes WHERE id_orden = ?",
      [id_orden]
    );
    return rows[0] || null;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function createOrder(estado, id_cliente) {
  try {
    const [result] = await conn.query(
      "INSERT INTO Ordenes (estado, id_cliente) VALUES (?, ?)",
      [estado, id_cliente]
    );
    return { success: true, result };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}

export async function updateOrder(id_orden, estado) {
  try {
    const [result] = await conn.query(
      "UPDATE Ordenes SET estado = ? WHERE id_orden = ?",
      [estado, id_orden]
    );
    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function deleteOrder(id_orden) {
  try {
    await conn.query("DELETE FROM Ordenes WHERE id_orden = ?", [id_orden]);
  } catch (e) {
    console.log(e);
    return e;
  }
}
