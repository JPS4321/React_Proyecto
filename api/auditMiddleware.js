// auditMiddleware.js
import conn from './connection.js';

const recordAudit = async (userId, action, productId, quantity, size) => {
    const timestamp = new Date();
  
    console.log("Datos para registrar en auditoría:", { userId, action, productId, quantity, size, timestamp });

    // Solo registrar si `quantity` es mayor que 0
    if (quantity > 0) {
      await conn.query(
        `INSERT INTO InventoryAudit (id_user, accion, id_producto, cantidad, size, fecha) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, action, productId, quantity, size, timestamp]
      );
      console.log("Registro de auditoría exitoso");
    } else {
      console.log("No se registró en auditoría ya que la cantidad es 0");
    }
};

export default recordAudit;

