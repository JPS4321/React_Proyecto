import express from "express";
import {
  getAllInventories,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
} from "../services/inventoryService.js";

const router = express.Router();

// Obtener todos los inventarios
router.get("/", async (req, res) => {
  const inventories = await getAllInventories();
  res.status(200).json(inventories);
});

// Obtener un inventario por ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const inventory = await getInventoryById(id);
  if (inventory) {
    res.status(200).json(inventory);
  } else {
    res.status(404).json({ error: "Inventario no encontrado" });
  }
});

// Crear un nuevo inventario
router.post("/", async (req, res) => {
  const { cantidad, id_producto } = req.body;
  const { success, result, error } = await createInventory(
    cantidad,
    id_producto
  );
  if (success) {
    res.status(201).json({
      message: "Inventario creado con éxito",
      id_inventario: result.insertId,
    });
  } else {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un inventario existente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  const result = await updateInventory(id, cantidad);
  if (result.affectedRows) {
    res.status(200).json({ message: "Inventario actualizado con éxito" });
  } else {
    res.status(404).json({ error: "Inventario no encontrado para actualizar" });
  }
});

// Eliminar un inventario
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deleteInventory(id);
  res.status(204).send();
});

export default router;
