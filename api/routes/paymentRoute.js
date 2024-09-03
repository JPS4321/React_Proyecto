import express from "express";
import {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "../services/paymentService.js";

const router = express.Router();

// Ruta para obtener todos los pagos
router.get("/", async (req, res) => {
  try {
    const payments = await getAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los pagos",
      error: error.message,
    });
  }
});

// Ruta para obtener un pago por ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await getPaymentById(req.params.id);
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: "Pago no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el pago", error: error.message });
  }
});

// Ruta para crear un nuevo pago
router.post("/", async (req, res) => {
  const { monto, id_orden } = req.body;
  try {
    const result = await createPayment(monto, id_orden);
    res.status(201).json({
      message: "Pago creado con éxito",
      id_pago: result[0].insertId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el pago", error: error.message });
  }
});

// Ruta para actualizar un pago
router.put("/:id", async (req, res) => {
  const { monto, id_orden } = req.body;
  try {
    const result = await updatePayment(req.params.id, monto, id_orden);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Pago actualizado con éxito" });
    } else {
      res.status(404).json({ message: "Pago no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el pago",
      error: error.message,
    });
  }
});

// Ruta para eliminar un pago
router.delete("/:id", async (req, res) => {
  try {
    const result = await deletePayment(req.params.id);
    if (result.affectedRows > 0) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: "Pago no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el pago:", error);
    res.status(500).json({ message: "Error al eliminar el pago", error: error.message });
  }
});

export default router;
