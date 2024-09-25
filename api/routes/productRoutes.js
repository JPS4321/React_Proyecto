import express from "express";
import multer from "multer";
import {
  getAllProductos,
  createProducto,
  deleteProducto,
  getProductoById,
  updateProducto,
} from "../services/productService.js";

const router = express.Router();

// Configuración de multer para manejar la subida de imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

function validacionProducto(req, res, next) {
  const {
    nombre,
    descripcion,
    precio,
    id_categoria,
    cantidad_xs,
    cantidad_s,
    cantidad_m,
    cantidad_l,
  } = req.body;
  if (
    !nombre ||
    !descripcion ||
    precio === undefined ||
    precio === null ||
    cantidad_xs === undefined ||
    cantidad_s === undefined ||
    cantidad_m === undefined ||
    cantidad_l === undefined
  ) {
    return res.status(400).json({
      error:
        "Faltan o son inválidos el nombre, la descripción, el precio o alguna cantidad.",
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
router.post(
  "/",
  upload.fields([
    { name: "imagen", maxCount: 1 },
    { name: "secondimage", maxCount: 1 },
  ]),
  validacionProducto,
  async (req, res) => {
    const {
      nombre,
      descripcion,
      precio,
      id_categoria,
      cantidad_xs,
      cantidad_s,
      cantidad_m,
      cantidad_l,
    } = req.body;
    const imagen = req.files["imagen"] ? req.files["imagen"][0].buffer : null;
    const secondimage = req.files["secondimage"]
      ? req.files["secondimage"][0].buffer
      : null;

    try {
      const { success, message, id_producto, error } = await createProducto(
        nombre,
        descripcion,
        precio,
        id_categoria,
        imagen,
        secondimage,
        cantidad_xs,
        cantidad_s,
        cantidad_m,
        cantidad_l
      );

      if (success) {
        return res.status(201).json({ success, message, id_producto });
      } else {
        return res
          .status(500)
          .json({
            success: false,
            message: "Error al crear el producto",
            error,
          });
      }
    } catch (error) {
      console.error("Error al procesar la creación del producto:", error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Error interno del servidor",
          error: error.message,
        });
    }
  }
);

// Actualizar un producto existente
router.put(
  "/:id",
  upload.fields([
    { name: "imagen", maxCount: 1 },
    { name: "secondimage", maxCount: 1 },
  ]),
  validacionProducto,
  async (req, res) => {
    const { id } = req.params;
    const {
      nombre,
      descripcion,
      precio,
      id_categoria,
      cantidad_xs,
      cantidad_s,
      cantidad_m,
      cantidad_l,
    } = req.body;
    const imagen = req.files["imagen"] ? req.files["imagen"][0].buffer : null; // Obtener la imagen si está disponible
    const secondimage = req.files["secondimage"]
      ? req.files["secondimage"][0].buffer
      : null; // Obtener la secondimage si está disponible

    try {
      const result = await updateProducto(
        id,
        nombre,
        descripcion,
        precio,
        id_categoria,
        imagen,
        secondimage,
        cantidad_xs,
        cantidad_s,
        cantidad_m,
        cantidad_l
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
  }
);

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
