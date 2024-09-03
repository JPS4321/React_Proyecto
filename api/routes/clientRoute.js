import express from "express";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../services/clientService.js";

const router = express.Router();

// Ruta para obtener todos los clientes
router.get("/", async (req, res) => {
  try {
    const clients = await getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los clientes", error: error.message });
  }
});

// Ruta para obtener un cliente por ID
router.get("/:id", async (req, res) => {
  try {
    const client = await getClientById(req.params.id);
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el cliente", error: error.message });
  }
});

// Ruta para crear un nuevo cliente
router.post("/", async (req, res) => {
  const { nombre, email, direccion, contra } = req.body;
  try {
    const result = await createClient(nombre, email, direccion, contra);
    res
      .status(201)
      .json({
        message: "Cliente creado con éxito",
        id_cliente: result[0].insertId,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el cliente", error: error.message });
  }
});

// Ruta para actualizar un cliente
router.put("/:id", async (req, res) => {
  const { nombre, email, direccion, contra } = req.body;
  try {
    const result = await updateClient(
      req.params.id,
      nombre,
      email,
      direccion,
      contra
    );
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Cliente actualizado con éxito" });
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el cliente",
        error: error.message,
      });
  }
});

// Ruta para eliminar un cliente
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteClient(req.params.id);
    if (result[0].affectedRows > 0) {
      res.status(204).send(); // Cambiado a 204 sin contenido
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error: error.message });
  }
});


export default router;