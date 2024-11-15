// auditMiddleware.js
import conn from './connection.js';

const recordAudit = async (req, action, productId, quantity) => {
  const userId = req.user.id_user; // Asegúrate de que el `id_user` se obtiene del token de autenticación
  const timestamp = new Date();

  await conn.query(
    `INSERT INTO InventoryAudit (id_user, accion, id_producto, cantidad, fecha) VALUES (?, ?, ?, ?, ?)`,
    [userId, action, productId, quantity, timestamp]
  );
};

export default recordAudit;
