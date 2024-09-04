import express from "express";
import multer from "multer";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";

const router = express.Router();

// Configuración de multer para manejar la subida de imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware de validación para los datos del usuario
function validacionUsuario(req, res, next) {
  const { username, email, password_hashed, is_admin, role } = req.body;
  if (!username || !email || !password_hashed || typeof is_admin === 'undefined' || !role) {
    return res.status(400).json({
      error: "Faltan o son inválidos el nombre de usuario, el correo electrónico, la contraseña, el estado de administrador o el rol.",
    });
  }
  next();
}

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
});

// Crear un nuevo usuario
router.post("/", upload.single('imagen'), validacionUsuario, async (req, res) => {
  const { username, email, password_hashed, is_admin, role } = req.body;
  const imagen = req.file ? req.file.buffer : null; // Obtener la imagen si está disponible

  try {
    const isAdminValue = is_admin ? 1 : 0; // Convertir el valor booleano a 1 o 0
    const { success, result, error } = await createUser(
      username,
      email,
      password_hashed,
      isAdminValue,  // Aquí se pasa el valor convertido
      role,
      imagen
    );
    if (success && result.affectedRows && result.affectedRows > 0) {
      return res.status(201).json({
        success: true,
        message: "Usuario creado con éxito",
        userId: result.insertId,
      });
    } else {
      console.error("Error al crear el usuario", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear el usuario",
        error: error,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error Interno del Servidor",
      error: error.message,
    });
  }
});

// Actualizar un usuario existente
router.put("/:id", upload.single('imagen'), validacionUsuario, async (req, res) => {
  const { id } = req.params;
  const { username, email, password_hashed, is_admin, role } = req.body;
  const imagen = req.file ? req.file.buffer : null; // Obtener la imagen si está disponible

  try {
    const isAdminValue = is_admin ? 1 : 0; // Convertir el valor booleano a 1 o 0
    const result = await updateUser(
      id,
      username,
      email,
      password_hashed,
      isAdminValue,
      role,
      imagen
    );
    if (result.affectedRows && result.affectedRows > 0) {
      return res.status(200).json({
        success: true,
        message: "Usuario actualizado con éxito",
        userId: id,
      });
    } else {
      throw new Error(`Error al actualizar el usuario con ID: ${id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Interno del Servidor" });
  }
});

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error Interno del Servidor" });
  }
});

export default router;
