import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/orderService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await getAllOrders();
  res.status(200).json(orders);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const order = await getOrderById(id);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ error: "Orden no encontrada" });
  }
});

router.post("/", async (req, res) => {
  const { estado, id_cliente } = req.body;
  const { success, result, error } = await createOrder(estado, id_cliente);
  if (success) {
    res.status(201).json({
      message: "Orden creada con éxito",
      id_orden: result.insertId,
    });
  } else {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const result = await updateOrder(id, estado);
  if (result.affectedRows) {
    res.status(200).json({ message: "Orden actualizada con éxito" });
  } else {
    res.status(404).json({ error: "Orden no encontrada para actualizar" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deleteOrder(id);
  res.status(204).send();
});

export default router;
