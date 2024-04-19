import express from "express";
import {
  addColorToProduct,
  getColorsOfProduct,
  removeColorFromProduct,
} from "../services/productColorService.js";

const router = express.Router();

// Añadir color a un producto
router.post("/:productId/colors/:colorId", async (req, res) => {
  try {
    const { productId, colorId } = req.params;
    await addColorToProduct(productId, colorId);
    res.status(201).json({ message: "Color añadido al producto con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al añadir el color al producto",
        error: error.message,
      });
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
