import express from "express";
import {
  getAllProductCollections,
  getProductCollectionById,
  createProductCollection,
  deleteProductCollection,
} from "../services/productCollectionService.js";

const router = express.Router();

// Obtener todas las relaciones Producto-Coleccion
router.get("/", async (req, res) => {
  const productCollections = await getAllProductCollections();
  res.status(200).json(productCollections);
});

// Obtener una relación Producto-Coleccion por ID
router.get("/:idProducto/:idColeccion", async (req, res) => {
  const { idProducto, idColeccion } = req.params;
  const productCollection = await getProductCollectionById(
    idProducto,
    idColeccion
  );
  res.status(200).json(productCollection);
});

// Crear una nueva relación Producto-Coleccion
router.post("/", async (req, res) => {
  const { id_producto, id_coleccion } = req.body;
  try {
    const { success, result, error } = await createProductCollection(
      id_producto,
      id_coleccion
    );
    if (success && result.affectedRows && result.affectedRows > 0) {
      return res.status(201).json({
        success: true,
        message: "Relación Producto-Coleccion creada con éxito",
        id_producto,
        id_coleccion,
      });
    } else {
      console.error("Error al crear la relación", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear la relación",
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

// Eliminar una relación Producto-Coleccion
router.delete("/:idProducto/:idColeccion", async (req, res) => {
  const { idProducto, idColeccion } = req.params;
  await deleteProductCollection(idProducto, idColeccion);
  res.status(204).send();
});

export default router;
