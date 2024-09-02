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
  const { nombre, descripcion, precio, id_categoria } = req.body;
  if (!nombre || !descripcion || precio === undefined || precio === null) {
    return res.status(400).json({
      error: "Faltan o son inválidos el nombre, la descripción o el precio.",
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
  if (producto) {
    res.status(200).json(producto);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

// Crear un nuevo producto
router.post("/", validacionProducto, async (req, res) => {
  const { nombre, descripcion, precio, id_categoria } = req.body;
  const imagen = req.file ? req.file.buffer : null; // Obtener la imagen si está disponible
  try {
    const { success, result, error } = await createProducto(
      nombre,
      descripcion,
      precio,
      id_categoria,
      imagen
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
  const { nombre, descripcion, precio, id_categoria } = req.body;
  const imagen = req.file ? req.file.buffer : null; // Obtener la imagen si está disponible

  try {
    const result = await updateProducto(
      id,
      nombre,
      descripcion,
      precio,
      id_categoria,
      imagen
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
  try {
    await deleteProducto(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ message: "Error Interno del Servidor" });
  }
});

export default router;
