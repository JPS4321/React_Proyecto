import express from "express";
import {
  addColorToProduct,
  getColorsOfProduct,
  removeColorFromProduct,
} from "../services/productColorService.js";

const router = express.Router();

router.post("/:id_producto/colors", async (req, res) => {
  const { id_producto } = req.params;
  const { id_colores } = req.body; // Esperamos un array de colores

  try {
    await Promise.all(id_colores.map(id_color => addColorToProduct(id_producto, id_color)));
    res.status(201).json({ success: true, message: "Colores asociados al producto" });
  } catch (error) {
    console.error('Error al asociar colores:', error);
    res.status(500).json({ success: false, message: 'Error al asociar colores', error: error.message });
  }
});

// Obtener colores de un producto
router.get("/:productId/colors", async (req, res) => {
  try {
    const { productId } = req.params;
    const colors = await getColorsOfProduct(productId);
    res.status(200).json(colors);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los colores del producto",
        error: error.message,
      });
  }
});

// Ruta para obtener productos por color
router.get("/colors/:colorId/products", async (req, res) => {
  try {
    const { colorId } = req.params;
    const products = await getProductsByColor(colorId);
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res
        .status(404)
        .json({
          message: "No se encontraron productos para el color especificado",
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los productos por color",
        error: error.message,
      });
  }
});

// Eliminar color de un producto
router.delete("/:productId/colors/:colorId", async (req, res) => {
  try {
    const { productId, colorId } = req.params;
    await removeColorFromProduct(productId, colorId);
    res.status(200).json({ message: "Color eliminado del producto con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar el color del producto",
        error: error.message,
      });
  }
});

export default router;
