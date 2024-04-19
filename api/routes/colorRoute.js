import express from "express";
import {
  getAllColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
} from "../services/colorService.js";

const router = express.Router();

// Ruta para obtener todos los colores
router.get("/", async (req, res) => {
  try {
    const colors = await getAllColors();
    res.status(200).json(colors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los colores", error: error.message });
  }
});

// Ruta para obtener un color por ID
router.get("/:id", async (req, res) => {
  try {
    const color = await getColorById(req.params.id);
    if (color) {
      res.status(200).json(color);
    } else {
      res.status(404).json({ message: "Color no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el color", error: error.message });
  }
});

// Ruta para crear un nuevo color
router.post("/", async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await createColor(nombre);
    res
      .status(201)
      .json({
        message: "Color creado con éxito",
        id_color: result[0].insertId,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el color", error: error.message });
  }
});

// Ruta para actualizar un color
router.put("/:id", async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await updateColor(req.params.id, nombre);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Color actualizado con éxito" });
    } else {
      res.status(404).json({ message: "Color no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el color", error: error.message });
  }
});

// Ruta para eliminar un color
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteColor(req.params.id);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Color eliminado con éxito" });
    } else {
      res.status(404).json({ message: "Color no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el color", error: error.message });
  }
});

export default router;
