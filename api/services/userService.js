import conn from "../connection.js";

// Obtener todos los usuarios
async function getAllUsers() {
  const [rows] = await conn.query("SELECT * FROM Users");
  return rows;
}

// Obtener un usuario por ID
async function getUserById(id) {
  const [rows] = await conn.query("SELECT * FROM Users WHERE id_user = ?", [id]);
  return rows[0];
}

// Crear un nuevo usuario
async function createUser(username, password_hashed, is_admin, role, imagen) {
  const result = await conn.query(
    "INSERT INTO Users (username, password_hashed, is_admin, role, imagen) VALUES (?, ?, ?, ?, ?)",
    [username, password_hashed, is_admin, role, imagen]
  );
  return result;
}

// Actualizar un usuario existente
async function updateUser(id, username, password_hashed, is_admin, role, imagen) {
  const result = await conn.query(
    "UPDATE Users SET username = ?, password_hashed = ?, is_admin = ?, role = ?, imagen = ? WHERE id_user = ?",
    [username, password_hashed, is_admin, role, imagen, id]
  );
  return result;
}

// Eliminar un usuario
async function deleteUser(id) {
  const result = await conn.query("DELETE FROM Users WHERE id_user = ?", [id]);
  return result;
}

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
