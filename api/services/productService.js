import conn from "../connection.js";

function convertirABase64(buffer, tipoImagen = "image/jpeg") {
  return buffer && Buffer.isBuffer(buffer)
    ? `data:${tipoImagen};base64,${buffer.toString("base64")}`
    : null;
}

export async function getAllProductos() {
  try {
    const [rows] = await conn.query("SELECT * FROM DivinoSeas_Productos");
    const productos = rows.map((producto) => ({
      ...producto,
      imagen: convertirABase64(producto.imagen),
      secondimage: convertirABase64(producto.secondimage),
    }));
    return productos;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProductoById(id_producto) {
  try {
    const [rows] = await conn.query(
      `SELECT p.*, c.nombre AS nombre_categoria, col.nombre AS nombre_color, colc.nombre AS nombre_coleccion, 
      promo.descripcion AS nombre_promocion
      FROM DivinoSeas_Productos p
      LEFT JOIN Categorias c ON p.id_categoria = c.id_categoria
      LEFT JOIN Colores col ON p.id_color = col.id_color
      LEFT JOIN Colecciones colc ON p.id_coleccion = colc.id_coleccion
      LEFT JOIN Promociones promo ON p.id_promocion = promo.id_promocion
      WHERE p.id_producto = ?`,
      [id_producto]
    );

    if (rows.length > 0) {
      const producto = {
        ...rows[0],
        imagen: convertirABase64(rows[0].imagen),
        secondimage: convertirABase64(rows[0].secondimage),
      };
      return producto;
    }
    return null;
  } catch (error) {
    console.error("Error en getProductoById:", error);
    return null;
  }
}

export async function createProducto(
  nombre,
  descripcion,
  precio,
  id_categoria,
  id_color,
  id_coleccion,
  id_promocion,
  imagen,
  secondimage,
  cantidad_xs,
  cantidad_s,
  cantidad_m,
  cantidad_l
) {
  try {
    const [result] = await conn.query(
      `INSERT INTO DivinoSeas_Productos (nombre, descripcion, precio, id_categoria, id_color, id_coleccion, id_promocion, imagen, secondimage, cantidad_xs, cantidad_s, cantidad_m, cantidad_l) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre,
        descripcion,
        precio,
        id_categoria,
        id_color,
        id_coleccion,
        id_promocion,
        imagen,
        secondimage,
        cantidad_xs,
        cantidad_s,
        cantidad_m,
        cantidad_l,
      ]
    );
    return { success: true, message: "Producto creado exitosamente", id_producto: result.insertId };
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return { success: false, error };
  }
}

export async function updateProducto(
    id_producto,
    nombre,
    descripcion,
    precio,
    id_categoria,
    id_color,
    id_coleccion,
    id_promocion,
    imagen,
    secondimage,
    cantidad_xs,
    cantidad_s,
    cantidad_m,
    cantidad_l
  ) {
    try {
      // Inicia la consulta y los parámetros
      let query = `UPDATE DivinoSeas_Productos SET nombre = ?, descripcion = ?, precio = ?, id_categoria = ?, id_color = ?, id_coleccion = ?, id_promocion = ?, cantidad_xs = ?, cantidad_s = ?, cantidad_m = ?, cantidad_l = ?`;
      const params = [nombre, descripcion, precio, id_categoria, id_color, id_coleccion, id_promocion, cantidad_xs, cantidad_s, cantidad_m, cantidad_l];
  
      // Agrega la imagen solo si está definida
      if (imagen !== undefined && imagen !== null) {
        query += `, imagen = ?`;
        params.push(imagen);
      }
  
      // Agrega la secondimage solo si está definida
      if (secondimage !== undefined && secondimage !== null) {
        query += `, secondimage = ?`;
        params.push(secondimage);
      }
  
      // Agrega la condición de WHERE y el id_producto al final
      query += ` WHERE id_producto = ?`;
      params.push(id_producto);
  
      // Ejecuta la consulta con los parámetros construidos dinámicamente
      const [result] = await conn.query(query, params);
      
      return { success: true, message: "Producto actualizado exitosamente" };
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      return { success: false, error };
    }
  }
  

export async function deleteProducto(id_producto) {
  try {
    await conn.query("DELETE FROM DivinoSeas_Productos WHERE id_producto = ?", [id_producto]);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
