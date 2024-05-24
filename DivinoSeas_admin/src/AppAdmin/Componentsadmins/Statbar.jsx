import "../styles/Statbar.css";
import React, { useState } from "react";
import search_Icon from "../../assets/search-b.png";

const Statbar = () => {
  const [val, setVal] = useState("Search");

  return (
    <nav className="statbar">
      <div className="left-section">
        <header>
          <h4>+</h4>
        </header>
        <section>
          <h4>REPORTE</h4>
        </section>
      </div>
      <main>
        <h1>INVENTARIO</h1>
      </main>
      <section className="search-box2">
        <input type="text" placeholder={val} className="input" />
        <img src={search_Icon} alt="Buscar" className="img" />
      </section>
    </nav>
  );
};

export default Statbar;
