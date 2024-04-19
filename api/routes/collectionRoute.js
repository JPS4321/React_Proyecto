import express from "express";
import {
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
} from "../services/collectionService.js";

const router = express.Router();

// Ruta para obtener todas las colecciones
router.get("/", async (req, res) => {
  try {
    const collections = await getAllCollections();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las colecciones",
      error: error.message,
    });
  }
});

// Ruta para obtener una colección por ID
router.get("/:id", async (req, res) => {
  try {
    const collection = await getCollectionById(req.params.id);
    if (collection) {
      res.status(200).json(collection);
    } else {
      res.status(404).json({ message: "Colección no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la colección", error: error.message });
  }
});

// Ruta para crear una nueva colección
router.post("/", async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await createCollection(nombre, descripcion);
    res.status(201).json({
      message: "Colección creada con éxito",
      id_coleccion: result[0].insertId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la colección", error: error.message });
  }
});

// Ruta para actualizar una colección
router.put("/:id", async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await updateCollection(req.params.id, nombre, descripcion);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Colección actualizada con éxito" });
    } else {
      res.status(404).json({ message: "Colección no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la colección",
      error: error.message,
    });
  }
});

// Ruta para eliminar una colección
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteCollection(req.params.id);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Colección eliminada con éxito" });
    } else {
      res.status(404).json({ message: "Colección no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la colección",
      error: error.message,
    });
  }
});

export default router;
