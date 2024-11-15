import React from 'react';
import "../styles/AuditReport.css";
import useTraceabilityReport from '../hooks/useTraceabilityReport';

const AuditReport = ({ onClose }) => {
  const { auditData, loading, error } = useTraceabilityReport();

  return (
    <div className="audit-report-container">
      <h2>Reporte de Trazabilidad de Inventario</h2>
      <button onClick={onClose} className="close-button">Cerrar</button>

      {loading ? (
        <p>Cargando datos de auditoría...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        Array.isArray(auditData) && auditData.length > 0 ? (
          <table className="audit-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Acción</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Talla</th> {/* Nueva columna para mostrar la talla */}
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {auditData.map((entry) => (
                <tr key={entry.id_audit}>
                  <td>{entry.usuario}</td>
                  <td>{entry.accion === 'suma' ? 'Ajuste de inventario (suma)' : 'Ajuste de inventario (resta)'}</td>
                  <td>{entry.producto}</td>
                  <td>{entry.cantidad}</td>
                  <td>{entry.size}</td> {/* Mostrar talla */}
                  <td>{new Date(entry.fecha).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron datos de auditoría.</p>
        )
      )}
    </div>
  );
};

export default AuditReport;
