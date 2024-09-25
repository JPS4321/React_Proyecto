// Statbar.js
import React, { useState } from "react";
import "../styles/Statbar.css";
import search_Icon from "../../assets/search-b.png";
import InventoryForm from './InventoryForm';

const Statbar = ({ onSearch }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <nav className="statbar">
        <div className="top-section">
          <div className="left-section">
            <button onClick={handleAddButtonClick} className="plus-button">+</button>
            <button className="report-button">REPORTE</button>
          </div>
          <h1 className="inventory-title">INVENTARIO</h1>
          <div className="search-box2">
            <input
              type="text"
              onChange={handleInputChange}
              placeholder="Search"
              className="input"
            />
            <img src={search_Icon} alt="Buscar" className="img" />
          </div>
        </div>
        <div className="lineapues"></div>
      </nav>
      {showForm && (
          <InventoryForm onClose={handleFormClose} />
        )}
    </div>
  );
};

export default Statbar;
