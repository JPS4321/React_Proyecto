import conn from "../connection.js";

export async function getAllInventories() {
  try {
    const [rows] = await conn.query("SELECT * FROM Inventarios");
    return rows;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getInventoryById(id_inventario) {
  try {
    const [rows] = await conn.query(
      "SELECT * FROM Inventarios WHERE id_inventario = ?",
      [id_inventario]
    );
    return rows[0] || null;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function createInventory(cantidad, id_producto) {
  try {
    const [result] = await conn.query(
      "INSERT INTO Inventarios (cantidad, id_producto) VALUES (?, ?)",
      [cantidad, id_producto]
    );
    return { success: true, result };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}

export async function updateInventory(id_inventario, cantidad) {
  try {
    const [result] = await conn.query(
      "UPDATE Inventarios SET cantidad = ? WHERE id_inventario = ?",
      [cantidad, id_inventario]
    );
    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function deleteInventory(id_inventario) {
  try {
    await conn.query("DELETE FROM Inventarios WHERE id_inventario = ?", [
      id_inventario,
    ]);
  } catch (e) {
    console.log(e);
    return e;
  }
}
