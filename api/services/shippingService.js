import conn from "../connection.js";

// Obtener todos los envíos
async function getAllShippings() {
  const [rows] = await conn.query("SELECT * FROM Envios");
  return rows;
}

// Obtener un envío por ID
async function getShippingById(id) {
  const [rows] = await conn.query(
    "SELECT * FROM Envios WHERE id_envio = ?",
    [id]
  );
  return rows[0];
}

// Crear un nuevo envío
async function createShipping(fechaEnvio, estado, id_orden) {
  const result = await conn.query(
    "INSERT INTO Envios (fechaEnvio, estado, id_orden) VALUES (?, ?, ?)",
    [fechaEnvio, estado, id_orden]
  );
  return result;
}

// Actualizar un envío existente
async function updateShipping(id, fechaEnvio, estado, id_orden) {
  const result = await conn.query(
    "UPDATE Envios SET fechaEnvio = ?, estado = ?, id_orden = ? WHERE id_envio = ?",
    [fechaEnvio, estado, id_orden, id]
  );
  return result;
}

// Eliminar un envío
async function deleteShipping(id) {
  const result = await conn.query(
    "DELETE FROM Envios WHERE id_envio = ?",
    [id]
  );
  return result;
}

export {
  getAllShippings,
  getShippingById,
  createShipping,
  updateShipping,
  deleteShipping,
};
