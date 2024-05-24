import "../styles/Statbar.css";
import React, { useState } from "react";
import search_Icon from "../../assets/search-b.png";

const Statbar = () => {
  const [val, setVal] = useState("Search");

  return (
    <nav className="statbar">
      <div className="top-section">
        <div className="left-section">
          <button className="plus-button">+</button>
          <button className="report-button">REPORTE</button>
        </div>
        <h1 className="inventory-title">INVENTARIO</h1>
        <div className="search-box2">
          <input type="text" placeholder={val} className="input" />
          <img src={search_Icon} alt="Buscar" className="img" />
        </div>
      </div>
    </nav>
  );
};

export default Statbar;
