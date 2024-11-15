import conn from "../connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Asegúrate de que `JWT_SECRET` esté definido y cargado desde `.env`
const JWT_SECRET = process.env.JWT_SECRET;

export async function getAllUsers() {
  try {
    const [rows] = await conn.query("SELECT * FROM Users");
    return rows;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getUserById(id_user) {
  try {
    const [rows] = await conn.query("SELECT * FROM Users WHERE id_user = ?", [
      id_user,
    ]);
    return rows[0] || null;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function createUser(
  username,
  email,
  password,
  is_admin,
  role,
  imagen
) {
  try {
    // Verificar si el correo ya existe
    const [existingUser] = await conn.query(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return { success: false, error: "El correo ya está registrado" };
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await conn.query(
      "INSERT INTO Users (username, email, password_hashed, is_admin, role, imagen) VALUES (?, ?, ?, ?, ?, ?)",
      [username, email, hashedPassword, is_admin, role, imagen]
    );
    return { success: true, result };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}

export async function getUserByEmail(email) {
  try {
    const [rows] = await conn.query(
      "SELECT id_user, username, email, password_hashed FROM Users WHERE email = ?",
      [email]
    );
    console.log("Fetched user from database:", rows[0]); // Debugging output
    return rows[0] || null;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function updateUser(
  id_user,
  username,
  email,
  password,
  is_admin,
  role,
  imagen
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await conn.query(
      "UPDATE Users SET username = ?, email = ?, password_hashed = ?, is_admin = ?, role = ?, imagen = ? WHERE id_user = ?",
      [username, email, hashedPassword, is_admin, role, imagen, id_user]
    );
    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function deleteUser(id_user) {
  try {
    await conn.query("DELETE FROM Users WHERE id_user = ?", [id_user]);
  } catch (e) {
    console.log(e);
    return e;
  }
}

export const loginUser = async (email, password) => {
  try {
    const [users] = await conn.query(
      "SELECT id_user, username, email, password_hashed FROM Users WHERE email = ?",
      [email]
    );

    const user = users[0];

    if (user && bcrypt.compareSync(password, user.password_hashed)) {
      const token = jwt.sign(
        { id_user: user.id_user, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      console.log("Creating token with data:", {
        id_user: user.id_user,
        username: user.username,
        email: user.email,
      });
      return { success: true, token, user };
    } else {
      return { success: false, message: "Credenciales incorrectas" };
    }
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    return { success: false, message: "Error interno del servidor" };
  }
};
