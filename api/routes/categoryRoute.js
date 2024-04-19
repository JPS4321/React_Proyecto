import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService.js";

const router = express.Router();

// Ruta para obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener las categorías",
        error: error.message,
      });
  }
});

// Ruta para obtener una categoría por ID
router.get("/:id", async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la categoría", error: error.message });
  }
});

// Ruta para crear una nueva categoría
router.post("/", async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await createCategory(nombre, descripcion);
    res
      .status(201)
      .json({
        message: "Categoría creada con éxito",
        id_categoria: result[0].insertId,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la categoría", error: error.message });
  }
});

// Ruta para actualizar una categoría
router.put("/:id", async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await updateCategory(req.params.id, nombre, descripcion);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Categoría actualizada con éxito" });
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar la categoría",
        error: error.message,
      });
  }
});

// Ruta para eliminar una categoría
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteCategory(req.params.id);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Categoría eliminada con éxito" });
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar la categoría",
        error: error.message,
      });
  }
});

export default router;
