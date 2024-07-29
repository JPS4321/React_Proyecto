import React, { useState } from 'react';
import OrdersList from './Orderslist';
import "../styles/Salesbar.css";

const Salesbar = () => {
  const [filter, setFilter] = useState('TODO');

  return (
    <div>
      <nav className="salesbar">
        <div className="top-sections">
          <div className="left-sections">
            <button className="nav-buttons" onClick={() => setFilter('TODO')}>TODO</button>
            <button className="nav-buttons" onClick={() => setFilter('ENTREGADO')}>ENVIADO</button>
            <button className="nav-buttons" onClick={() => setFilter('PENDIENTE')}>PENDIENTE</button>
          </div>
          <h1 className="ventas-title">VENTAS</h1>
          <div className="right-sections">
            <a href="" className="custom-report-button">REPORTE PERSONALIZADO</a>
          </div>
        </div>
        <div className="lineapues"></div>
      </nav>

      <OrdersList filter={filter} />
    </div>
  );
};

export default Salesbar;
