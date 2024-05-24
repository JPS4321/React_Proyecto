import "../styles/Statbar.css";
import React, { useState } from "react";
import search_Icon from "../../assets/search-b.png";

const Statbar = () => {
  const [val, setVal] = useState("Search");

  return (
    <nav className="statbar">
      <header>
        <h4>AGREGAR NUEVO ESTILO</h4>
      </header>
      <section className="search-box2">
        <input type="text" placeholder={val} className="input" />
        <img src={search_Icon} alt="Buscar" className="img" />
      </section>
      <main>
        <h1>INVENTARIO</h1>
      </main>
      <section>
        <h4>REPORTE DE ENTRADAS Y SALIDAS</h4>
      </section>
    </nav>
  );
};

export default Statbar;
