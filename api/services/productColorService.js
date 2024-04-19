import conn from "../connection.js";

// Añadir color a un producto
async function addColorToProduct(productId, colorId) {
  const result = await conn.query(
    "INSERT INTO ProductoColores (id_producto, id_color) VALUES (?, ?)",
    [productId, colorId]
  );
  return result;
}

// Obtener todos los colores de un producto específico
async function getColorsOfProduct(productId) {
  const [rows] = await conn.query(
    "SELECT Colores.id_color, Colores.nombre FROM ProductoColores JOIN Colores ON ProductoColores.id_color = Colores.id_color WHERE ProductoColores.id_producto = ?",
    [productId]
  );
  return rows;
}

// Obtener productos por un color específico
async function getProductsByColor(colorId) {
  const [rows] = await conn.query(
    `
        SELECT DivinoSeas_Productos.id_producto, DivinoSeas_Productos.nombre, DivinoSeas_Productos.descripcion, DivinoSeas_Productos.precio 
        FROM ProductoColores
        JOIN DivinoSeas_Productos ON ProductoColores.id_producto = DivinoSeas_Productos.id_producto
        WHERE ProductoColores.id_color = ?`,
    [colorId]
  );
  return rows;
}

// Eliminar un color específico de un producto
async function removeColorFromProduct(productId, colorId) {
  const result = await conn.query(
    "DELETE FROM ProductoColores WHERE id_producto = ? AND id_color = ?",
    [productId, colorId]
  );
  return result;
}

export {
  addColorToProduct,
  getColorsOfProduct,
  getProductsByColor,
  removeColorFromProduct,
};
