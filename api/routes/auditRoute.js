// auditRoutes.js
import express from 'express';
import conn from '../connection.js';

const router = express.Router();

router.get('/inventory', async (req, res) => {
  try {
    const [rows] = await conn.query(`
      SELECT 
        a.id_audit, 
        u.username AS usuario, 
        a.accion, 
        p.nombre AS producto, 
        a.cantidad, 
        a.fecha
      FROM InventoryAudit a
      JOIN Users u ON a.id_user = u.id_user
      JOIN DivinoSeas_Productos p ON a.id_producto = p.id_producto
      ORDER BY a.fecha DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching audit data:", error);
    res.status(500).json({ error: "Error fetching audit data" });
  }
});

export default router;
