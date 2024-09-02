import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los usuarios",
      error: error.message,
    });
  }
});

// Ruta para obtener un usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el usuario",
      error: error.message,
    });
  }
});

// Ruta para crear un nuevo usuario
router.post("/", async (req, res) => {
  const { username, password_hashed, is_admin, role, imagen } = req.body;
  try {
    const result = await createUser(username, password_hashed, is_admin, role, imagen);
    res.status(201).json({
      message: "Usuario creado con éxito",
      id_user: result[0].insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
});

// Ruta para actualizar un usuario
router.put("/:id", async (req, res) => {
  const { username, password_hashed, is_admin, role, imagen } = req.body;
  try {
    const result = await updateUser(req.params.id, username, password_hashed, is_admin, role, imagen);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Usuario actualizado con éxito" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
});

// Ruta para eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Usuario eliminado con éxito" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el usuario",
      error: error.message,
    });
  }
});

export default router;
