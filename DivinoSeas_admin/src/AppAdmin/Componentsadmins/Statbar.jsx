// Statbar.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/Statbar.css";
import search_Icon from "../../assets/search-b.png";
import InventoryForm from './InventoryForm'; // Importa el formulario de creación de productos

const Statbar = ({ onSearch }) => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleTraceabilityReportClick = () => {
    navigate('/TraceabilityReport'); // Redirige a la ruta del reporte de trazabilidad
  };

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <nav className="statbar">
        <div className="top-section">
          <div className="left-section">
            {location.pathname === "/Stock" && (
              <button onClick={handleAddButtonClick} className="plus-button">+</button>
            )}
            <button onClick={handleTraceabilityReportClick} className="report-button">
              REPORTE 
            </button>
          </div>
          <h1 className="inventory-title">
            {location.pathname === "/Stock" ? "INVENTARIO" : "REPORTE DE TRAZABILIDAD"}
          </h1>
          {location.pathname === "/Stock" && (
            <div className="search-box2">
              <input
                type="text"
                onChange={handleInputChange}
                placeholder="Buscar"
                className="input"
              />
              <img src={search_Icon} alt="Buscar" className="img" />
            </div>
          )}
        </div>
        <div className="lineapues"></div>
      </nav>

      {/* Renderizar el formulario de creación solo si showForm es true y estamos en /Stock */}
      {showForm && location.pathname === "/Stock" && (
        <InventoryForm onClose={handleFormClose} />
      )}
    </div>
  );
};

export default Statbar;
