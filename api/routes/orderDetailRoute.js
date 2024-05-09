import express from "express";
import {
  getAllOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
} from "../services/orderDetailService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const orderDetails = await getAllOrderDetails();
  res.status(200).json(orderDetails);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const orderDetail = await getOrderDetailById(id);
  if (orderDetail) {
    res.status(200).json(orderDetail);
  } else {
    res.status(404).json({ error: "Detalle de orden no encontrado" });
  }
});

router.post("/", async (req, res) => {
  const { cantidad, precioPorUnidad, id_orden, id_producto } = req.body;
  const { success, result, error } = await createOrderDetail(
    cantidad,
    precioPorUnidad,
    id_orden,
    id_producto
  );
  if (success) {
    res.status(201).json({
      message: "Detalle de orden creado con éxito",
      id_ordenDetalle: result.insertId,
    });
  } else {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { cantidad, precioPorUnidad, id_orden, id_producto } = req.body;
  const result = await updateOrderDetail(
    id,
    cantidad,
    precioPorUnidad,
    id_orden,
    id_producto
  );
  if (result.affectedRows) {
    res.status(200).json({ message: "Detalle de orden actualizado con éxito" });
  } else {
    res
      .status(404)
      .json({ error: "Detalle de orden no encontrado para actualizar" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deleteOrderDetail(id);
  res.status(204).send();
});

export default router;
