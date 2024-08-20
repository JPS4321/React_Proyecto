import React, { useState } from 'react';
import Cardsett from './Card.jsx';
import '../styles/Cardcontainer.css';

const CardSetContainer = () => {
  const [cards, setCards] = useState([]);
  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };
  const addCard = (newCard) => {
    setCards([...cards, newCard]);
  };

  const handleAddCard = (event) => {
    event.preventDefault();

    const newCard = {
      nombre: event.target.nombre.value,
      descripcion: event.target.descripcion.value,
      cantidad: event.target.cantidad.value,
      imagen: event.target.imagen.value,
      tipo: event.target.tipo.value,
    };

    addCard(newCard);
    event.target.reset();
  };

  return (
    <div className="card-container">
      <div className="add-card-section">
        <h2>Agregar Carta</h2>
        <form onSubmit={handleAddCard}>
          <input type="text" name="nombre" placeholder="Nombre" required />
          <input type="text" name="descripcion" placeholder="Descripción" required />
          <input type="number" name="cantidad" placeholder="Cantidad de prendas" required />
          <input type="text" name="imagen" placeholder="URL de la imagen" required />
          <input type="text" name="tipo" placeholder="Tipo" required />
          <button type="submit">Agregar</button>
        </form>
      </div>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div key={index} className="grid-item">
            <Cardsett {...card} onDelete={() => deleteCard(card.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSetContainer;
