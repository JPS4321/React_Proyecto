import React, { useEffect, useState } from "react";
import "../styles/AuditReport.css"; // Asegúrate de crear un archivo CSS para este componente si es necesario

const AuditReport = ({ onClose }) => {
  const [auditData, setAuditData] = useState([]);

  // Función simulada para obtener los datos de auditoría
  useEffect(() => {
    // Aquí podrías llamar a una API real para obtener los datos
    const fetchAuditData = async () => {
      // Simulación de datos de auditoría
      const data = [
        { id: 1, usuario: "Juan Pérez", accion: "Ajuste de inventario (suma)", producto: "Producto A", cantidad: 10, fecha: "2024-11-14" },
        { id: 2, usuario: "Ana López", accion: "Ajuste de inventario (resta)", producto: "Producto B", cantidad: -5, fecha: "2024-11-13" },
        // Más datos de ejemplo...
      ];
      setAuditData(data);
    };

    fetchAuditData();
  }, []);

  return (
    <div className="audit-report-container">
      <h2>Reporte de Trazabilidad de Inventario</h2>
      <button onClick={onClose} className="close-button">Cerrar</button>
      <table className="audit-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {auditData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.usuario}</td>
              <td>{entry.accion}</td>
              <td>{entry.producto}</td>
              <td>{entry.cantidad}</td>
              <td>{entry.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditReport;
