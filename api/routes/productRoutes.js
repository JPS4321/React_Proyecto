import express from "express";
import {
  getAllProductos,
  createProducto,
  deleteProducto,
  getProductoById,
  updateProducto,
} from "../services/productService.js";

const router = express.Router();

function validacionProducto(req, res, next) {
  const { nombre, descripcion, picture, existencias } = req.body;
  if (!nombre || !descripcion || !existencias) {
    return res.status(400).json({
      error:
        "Faltan o son inválidos el nombre, la descripción o las existencias.",
    });
  }
  next();
}

// Obtener todos los productos
router.get("/", async (req, res) => {
  const productos = await getAllProductos();
  res.status(200).json(productos);
});

// Obtener un producto por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const producto = await getProductoById(id);
  res.status(200).json(producto);
});

// Crear un nuevo producto
router.post("/", validacionProducto, async (req, res) => {
  const { nombre, descripcion, picture, existencias } = req.body;
  try {
    const { success, result, error } = await createProducto(
      nombre,
      descripcion,
      picture,
      existencias
    );
    if (success && result.affectedRows && result.affectedRows > 0) {
      return res.status(201).json({
        success: true,
        message: "Producto creado con éxito",
        productId: result.insertId,
      });
    } else {
      console.error("Error al crear el producto", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear el producto",
        error: error,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error Interno del Servidor",
      error: error.message,
    });
  }
});

// Actualizar un producto existente
router.put("/:id", validacionProducto, async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, picture, existencias } = req.body;

  try {
    const result = await updateProducto(
      id,
      nombre,
      descripcion,
      picture,
      existencias
    );
    if (result.affectedRows && result.affectedRows > 0) {
      return res.status(200).json({
        success: true,
        message: "Producto actualizado con éxito",
        productId: id,
      });
    } else {
      throw new Error(`Error al actualizar el producto con ID: ${id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Interno del Servidor" });
  }
});

// Eliminar un producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deleteProducto(id);
  res.status(204).send();
});

export default router;
