import conn from "../connection.js";

// Obtener todos los pagos
async function getAllPayments() {
  const [rows] = await conn.query("SELECT * FROM Pagos");
  return rows;
}

// Obtener un pago por ID
async function getPaymentById(id) {
  const [rows] = await conn.query("SELECT * FROM Pagos WHERE id_pago = ?", [
    id,
  ]);
  return rows[0];
}

// Crear un nuevo pago
async function createPayment(monto, id_orden) {
  const result = await conn.query(
    "INSERT INTO Pagos (monto, id_orden) VALUES (?, ?)",
    [monto, id_orden]
  );
  return result;
}

// Actualizar un pago existente
async function updatePayment(id, monto, id_orden) {
  const result = await conn.query(
    "UPDATE Pagos SET monto = ?, id_orden = ? WHERE id_pago = ?",
    [monto, id_orden, id]
  );
  return result;
}

// Eliminar un pago
async function deletePayment(id) {
  const result = await conn.query("DELETE FROM Pagos WHERE id_pago = ?", [id]);
  return result;
}

export {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
