import conn from "../connection.js";

export async function getAllProductPromotions() {
  try {
    const [rows] = await conn.query(`
      SELECT p.*, pr.descuento, pr.descripcion AS promocionDescripcion
      FROM DivinoSeas_Productos p
      LEFT JOIN ProductoPromocion pp ON p.id_producto = pp.id_producto
      LEFT JOIN Promociones pr ON pp.id_promocion = pr.id_promocion
    `);

    // Calcular el precio con descuento si existe
    const productos = rows.map(producto => {
      let precioConDescuento = producto.precio;
      if (producto.descuento) {
        const descuento = producto.descuento / 100;
        precioConDescuento = producto.precio - (producto.precio * descuento);
      }

      return {
        ...producto,
        precioConDescuento: precioConDescuento.toFixed(2),  // Redondear a dos decimales
      };
    });

    return productos;
  } catch (e) {
    console.log(e);
    return e;
  }
}


export async function getProductPromotionById(id_producto, id_promocion) {
  try {
    const [rows] = await conn.query(
      `SELECT p.*, pr.descuento, pr.descripcion AS promocionDescripcion
       FROM DivinoSeas_Productos p
       LEFT JOIN ProductoPromocion pp ON p.id_producto = pp.id_producto
       LEFT JOIN Promociones pr ON pp.id_promocion = pr.id_promocion
       WHERE p.id_producto = ? AND pr.id_promocion = ?`,
      [id_producto, id_promocion]
    );

    if (rows.length > 0) {
      const producto = rows[0];

      // Calcular el precio con descuento si existe
      let precioConDescuento = producto.precio;
      if (producto.descuento) {
        const descuento = producto.descuento / 100;
        precioConDescuento = producto.precio - (producto.precio * descuento);
      }

      // Retornar el producto con el precio con descuento
      return {
        ...producto,
        precioConDescuento: precioConDescuento.toFixed(2),  // Redondear a dos decimales
      };
    }
    return null;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function createProductPromotion(id_producto, id_promocion) {
  try {
    const [result] = await conn.query(
      "INSERT INTO ProductoPromocion (id_producto, id_promocion) VALUES (?, ?)",
      [id_producto, id_promocion]
    );
    return { success: true, result };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}

export async function deleteProductPromotion(id_producto, id_promocion) {
  try {
    await conn.query(
      "DELETE FROM ProductoPromocion WHERE id_producto = ? AND id_promocion = ?",
      [id_producto, id_promocion]
    );
  } catch (e) {
    console.log(e);
    return e;
  }
}
