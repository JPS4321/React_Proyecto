import express from "express";
import {
  getAllShippings,
  getShippingById,
  createShipping,
  updateShipping,
  deleteShipping,
} from "../services/shippingService.js";

const router = express.Router();

// Ruta para obtener todos los envíos
router.get("/", async (req, res) => {
  try {
    const shippings = await getAllShippings();
    res.status(200).json(shippings);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los envíos",
        error: error.message,
      });
  }
});

// Ruta para obtener un envío por ID
router.get("/:id", async (req, res) => {
  try {
    const shipping = await getShippingById(req.params.id);
    if (shipping) {
      res.status(200).json(shipping);
    } else {
      res.status(404).json({ message: "Envío no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el envío", error: error.message });
  }
});

// Ruta para crear un nuevo envío
router.post("/", async (req, res) => {
  const { fechaEnvio, estado, id_orden } = req.body;
  try {
    const result = await createShipping(fechaEnvio, estado, id_orden);
    res
      .status(201)
      .json({
        message: "Envío creado con éxito",
        id_envio: result[0].insertId,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el envío", error: error.message });
  }
});

// Ruta para actualizar un envío
router.put("/:id", async (req, res) => {
  const { fechaEnvio, estado, id_orden } = req.body;
  try {
    const result = await updateShipping(req.params.id, fechaEnvio, estado, id_orden);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Envío actualizado con éxito" });
    } else {
      res.status(404).json({ message: "Envío no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el envío",
        error: error.message,
      });
  }
});

// Ruta para eliminar un envío
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteShipping(req.params.id);
    if (result.affectedRows > 0) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: "Envío no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el envío:", error);
    res.status(500).json({ message: "Error al eliminar el envío", error: error.message });
  }
});


export default router;
