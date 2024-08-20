import React from 'react';
import '../styles/CardSettings.css';

const Cardsett = ({ nombre, descripcion, cantidad, imagen, tipo, onDelete }) => {
  return (
    <div className="card">
      <img src={imagen || "path_to_default_profile_image.jpg"} alt={nombre} className="card-image" />
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p><strong>Cantidad:</strong> {cantidad}</p>
      <p><strong>Tipo:</strong> {tipo}</p>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default Cardsett;
