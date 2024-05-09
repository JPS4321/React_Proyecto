import express from "express";
import {
  getAllProductPromotions,
  getProductPromotionById,
  createProductPromotion,
  deleteProductPromotion,
} from "../services/productPromotionService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const productPromotions = await getAllProductPromotions();
  res.status(200).json(productPromotions);
});

router.get("/:idProducto/:idPromocion", async (req, res) => {
  const { idProducto, idPromocion } = req.params;
  const productPromotion = await getProductPromotionById(
    idProducto,
    idPromocion
  );
  if (productPromotion) {
    res.status(200).json(productPromotion);
  } else {
    res
      .status(404)
      .json({ error: "Relación Producto-Promoción no encontrada" });
  }
});

router.post("/", async (req, res) => {
  const { id_producto, id_promocion } = req.body;
  const { success, result, error } = await createProductPromotion(
    id_producto,
    id_promocion
  );
  if (success) {
    res.status(201).json({
      message: "Relación Producto-Promoción creada con éxito",
      id_producto,
      id_promocion,
    });
  } else {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:idProducto/:idPromocion", async (req, res) => {
  const { idProducto, idPromocion } = req.params;
  await deleteProductPromotion(idProducto, idPromocion);
  res.status(204).send();
});

export default router;
