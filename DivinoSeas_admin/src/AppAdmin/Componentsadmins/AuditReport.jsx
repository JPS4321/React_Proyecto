import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/AuditReport.css";
import useTraceabilityReport from '../hooks/useTraceabilityReport';

const AuditReport = () => {
  const { auditData, loading, error } = useTraceabilityReport();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const paginatedData = auditData?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="page-container">
      {/* Título y botón de regreso */}
      <div className="header">
        <button onClick={() => navigate('/Stock')} className="back-button">
          &#8592; {/* Flecha de regreso */}
        </button>
        <h2>Reporte de Trazabilidad de Inventario</h2>
      </div>

      {/* Contenido del reporte */}
      <div className="audit-report-container">
        {loading ? (
          <p className="loading-message">Cargando datos de auditoría...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          Array.isArray(auditData) && auditData.length > 0 ? (
            <>
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Talla</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((entry) => (
                    <tr key={entry.id_audit}>
                      <td>{entry.usuario}</td>
                      <td>{entry.producto}</td>
                      <td>
                        {entry.accion === 'suma' ? `+${entry.cantidad}` : `-${entry.cantidad}`}
                      </td>
                      <td>{entry.size}</td>
                      <td>{new Date(entry.fecha).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="pagination-button"
                >
                  Anterior
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={(currentPage + 1) * itemsPerPage >= auditData.length}
                  className="pagination-button"
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            <p className="no-data-message">No se encontraron datos de auditoría.</p>
          )
        )}
      </div>
    </div>
  );
};

export default AuditReport;
