import conn from "../connection.js";

// Obtener todos los clientes
async function getAllClients() {
  try {
    const [rows] = await conn.query("SELECT * FROM Clientes");
    return rows;
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    throw error;
  }
}

// Obtener un cliente por ID
async function getClientById(id) {
  try {
    const [rows] = await conn.query(
      "SELECT * FROM Clientes WHERE id_cliente = ?",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error(`Error al obtener el cliente con ID ${id}:`, error);
    throw error;
  }
}

// Crear un nuevo cliente
async function createClient(nombre, email, direccion, contra) {
  try {
    const [result] = await conn.query(
      "INSERT INTO Clientes (nombre, email, direccion, contra) VALUES (?, ?, ?, ?)",
      [nombre, email, direccion, contra]
    );
    return result;
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    throw error;
  }
}

// Actualizar un cliente existente
async function updateClient(id, nombre, email, direccion, contra) {
  try {
    const [result] = await conn.query(
      "UPDATE Clientes SET nombre = ?, email = ?, direccion = ?, contra = ? WHERE id_cliente = ?",
      [nombre, email, direccion, contra, id]
    );
    return result;
  } catch (error) {
    console.error(`Error al actualizar el cliente con ID ${id}:`, error);
    throw error;
  }
}

// Eliminar un cliente
async function deleteClient(id) {
  try {
    const [result] = await conn.query("DELETE FROM Clientes WHERE id_cliente = ?", [
      id,
    ]);
    return result;
  } catch (error) {
    console.error(`Error al eliminar el cliente con ID ${id}:`, error);
    throw error;
  }
}

export {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
