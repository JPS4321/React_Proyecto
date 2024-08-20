import React from 'react';
import Card from './Card';
import '../styles/cardcontainer.css';

const CardSetContainer = () => {
  return (
    <div className="card-container">
      <div className="add-card-section">
        <h2>Agregar Carta</h2>
        {/* Aquí iría el formulario o botones para agregar nuevas cartas */}
      </div>
      <div className="cards-grid">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="grid-item">
            <Card />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
