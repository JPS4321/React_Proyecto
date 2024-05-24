import "../styles/Salesbar.css";

const Salesbar = () => {
  return (
    <nav className="salesbar">
      <div className="top-sections">
        <div className="left-sections">
          <button className="nav-buttons">TODO</button>
          <button className="nav-buttons">ENVIADO</button>
          <button className="nav-buttons">PENDIENTE</button>
        </div>
        <h1 className="ventas-title">VENTAS</h1>
        <div className="right-sections">
          <button className="custom-report-button">REPORTE PERSONALIZADO</button>
        </div>
      </div>
      <div className="lineapues"></div>
    </nav>
  );
};

export default Salesbar;
