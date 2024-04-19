import conn from "../connection.js";

// Obtener todas las categorías
async function getAllCategories() {
  const [rows] = await conn.query("SELECT * FROM Categorias");
  return rows;
}

// Obtener una categoría por ID
async function getCategoryById(id) {
  const [rows] = await conn.query(
    "SELECT * FROM Categorias WHERE id_categoria = ?",
    [id]
  );
  return rows[0];
}

// Crear una nueva categoría
async function createCategory(nombre, descripcion) {
  const result = await conn.query(
    "INSERT INTO Categorias (nombre, descripcion) VALUES (?, ?)",
    [nombre, descripcion]
  );
  return result;
}

// Actualizar una categoría existente
async function updateCategory(id, nombre, descripcion) {
  const result = await conn.query(
    "UPDATE Categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?",
    [nombre, descripcion, id]
  );
  return result;
}

// Eliminar una categoría
async function deleteCategory(id) {
  const result = await conn.query(
    "DELETE FROM Categorias WHERE id_categoria = ?",
    [id]
  );
  return result;
}

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
