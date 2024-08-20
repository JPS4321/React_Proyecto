import React from 'react';
import '../styles/CardSettings';

const Card = () => {
  return (
    <div className="card">
      <h3>Card Title</h3>
      <p>Card Content</p>
      <button>Editar</button>
      <button>Eliminar</button>
    </div>
  );
};

export default Card;
