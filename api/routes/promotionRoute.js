import express from "express";
import {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../services/promotionService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const promotions = await getAllPromotions();
  res.status(200).json(promotions);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const promotion = await getPromotionById(id);
  if (promotion) {
    res.status(200).json(promotion);
  } else {
    res.status(404).json({ error: "Promoción no encontrada" });
  }
});

router.post("/", async (req, res) => {
  const { descripcion, descuento, fechaInicio, fechaFin } = req.body;
  const { success, result, error } = await createPromotion(
    descripcion,
    descuento,
    fechaInicio,
    fechaFin
  );
  if (success) {
    res.status(201).json({
      message: "Promoción creada con éxito",
      id_promocion: result.insertId,
    });
  } else {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { descripcion, descuento, fechaInicio, fechaFin } = req.body;
  const result = await updatePromotion(
    id,
    descripcion,
    descuento,
    fechaInicio,
    fechaFin
  );
  if (result.affectedRows) {
    res.status(200).json({ message: "Promoción actualizada con éxito" });
  } else {
    res.status(404).json({ error: "Promoción no encontrada para actualizar" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deletePromotion(id);
  res.status(204).send();
});

export default router;
