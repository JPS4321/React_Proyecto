import conn from "../connection.js";

// Obtener todas las colecciones
async function getAllCollections() {
  const [rows] = await conn.query("SELECT * FROM Colecciones");
  return rows;
}

// Obtener una colección por ID
async function getCollectionById(id) {
  const [rows] = await conn.query(
    "SELECT * FROM Colecciones WHERE id_coleccion = ?",
    [id]
  );
  return rows[0];
}

// Crear una nueva colección
async function createCollection(nombre, descripcion) {
  const result = await conn.query(
    "INSERT INTO Colecciones (nombre, descripcion) VALUES (?, ?)",
    [nombre, descripcion]
  );
  return result;
}

// Actualizar una colección existente
async function updateCollection(id, nombre, descripcion) {
  const result = await conn.query(
    "UPDATE Colecciones SET nombre = ?, descripcion = ? WHERE id_coleccion = ?",
    [nombre, descripcion, id]
  );
  return result;
}

// Eliminar una colección
async function deleteCollection(id) {
  const result = await conn.query(
    "DELETE FROM Colecciones WHERE id_coleccion = ?",
    [id]
  );
  return result;
}

export {
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
};
