import conn from "../connection.js";

// Obtener todos los clientes
async function getAllClients() {
  const [rows] = await conn.query("SELECT * FROM Clientes");
  return rows;
}

// Obtener un cliente por ID
async function getClientById(id) {
  const [rows] = await conn.query(
    "SELECT * FROM Clientes WHERE id_cliente = ?",
    [id]
  );
  return rows[0];
}

// Crear un nuevo cliente
async function createClient(nombre, email, direccion, contra) {
  const result = await conn.query(
    "INSERT INTO Clientes (nombre, email, direccion, contra) VALUES (?, ?, ?, ?)",
    [nombre, email, direccion, contra]
  );
  return result;
}

// Actualizar un cliente existente
async function updateClient(id, nombre, email, direccion, contra) {
  const result = await conn.query(
    "UPDATE Clientes SET nombre = ?, email = ?, direccion = ?, contra = ? WHERE id_cliente = ?",
    [nombre, email, direccion, contra, id]
  );
  return result;
}

// Eliminar un cliente
async function deleteClient(id) {
  const result = await conn.query("DELETE FROM Clientes WHERE id_cliente = ?", [
    id,
  ]);
  return result;
}

export {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
