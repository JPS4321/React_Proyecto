import conn from "../connection.js";


export async function getAllOrders() {
  try {
    const [rows] = await conn.query(`
      SELECT o.id_orden, o.estado, o.fechaCreacion, o.id_cliente, 
             c.nombre AS nombre_cliente, 
             COALESCE(SUM(od.cantidad * od.precioPorUnidad), 0) AS monto
      FROM Ordenes o
      LEFT JOIN Clientes c ON o.id_cliente = c.id_cliente
      LEFT JOIN OrdenDetalles od ON o.id_orden = od.id_orden
      GROUP BY o.id_orden;
    `);
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
