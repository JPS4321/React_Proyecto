import CardCreate from './CardCreate';
import '../styles/ContenidoCreate.css';
import React, { useState, useEffect, useRef } from 'react';


const ContenidoCreate = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (cardName) => {
    setActiveCard(cardName);
  };

  const handleCloseCard = () => {
    setActiveCard(null);
  };

  return (
    <div className="contenido-create">
      <CardCreate
        text="Promociones"
        isActive={activeCard === 'Promociones'}
        onClick={() => handleCardClick('Promociones')}
        onClose={handleCloseCard}
      />
      <CardCreate
        text="Colores"
        isActive={activeCard === 'Colores'}
        onClick={() => handleCardClick('Colores')}
        onClose={handleCloseCard}
      />
      <CardCreate
        text="Colección"
        isActive={activeCard === 'Colección'}
        onClick={() => handleCardClick('Colección')}
        onClose={handleCloseCard}
      />
      <CardCreate
        text="Categoría"
        isActive={activeCard === 'Categoría'}
        onClick={() => handleCardClick('Categoría')}
        onClose={handleCloseCard}
      />
    </div>
  );
};

export default ContenidoCreate;
