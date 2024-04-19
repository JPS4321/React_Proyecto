import conn from "../connection.js";

// Obtener todos los colores
async function getAllColors() {
  const [rows] = await conn.query("SELECT * FROM Colores");
  return rows;
}

// Obtener un color por ID
async function getColorById(id) {
  const [rows] = await conn.query("SELECT * FROM Colores WHERE id_color = ?", [
    id,
  ]);
  return rows[0];
}

// Crear un nuevo color
async function createColor(nombre) {
  const result = await conn.query("INSERT INTO Colores (nombre) VALUES (?)", [
    nombre,
  ]);
  return result;
}

// Actualizar un color existente
async function updateColor(id, nombre) {
  const result = await conn.query(
    "UPDATE Colores SET nombre = ? WHERE id_color = ?",
    [nombre, id]
  );
  return result;
}

// Eliminar un color
async function deleteColor(id) {
  const result = await conn.query("DELETE FROM Colores WHERE id_color = ?", [
    id,
  ]);
  return result;
}

export { getAllColors, getColorById, createColor, updateColor, deleteColor };
