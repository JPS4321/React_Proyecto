import React, { useState, useEffect, useRef } from 'react';

const Card = ({ text, isActive, onClick, onClose }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const cardRef = useRef(null);

  // Manejador para cerrar otras tarjetas al abrir una
  useEffect(() => {
    if (!isActive) {
      setFormVisible(false);
    }
  }, [isActive]);

  // Manejador para detectar clics fuera de la tarjeta
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setFormVisible(false);
        onClose();
      }
    };

    if (isFormVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormVisible, onClose]);

  const handleAddClick = () => {
    onClick();
    setFormVisible(true);
  };

  const renderFormFields = () => {
    switch (text) {
      case 'Promociones':
        return (
          <>
            <label>Descripción:</label>
            <textarea name="descripcion" />
            <label>Descuento:</label>
            <input type="number" step="0.01" name="descuento" />
            <label>Fecha Inicio:</label>
            <input type="date" name="fechaInicio" />
            <label>Fecha Fin:</label>
            <input type="date" name="fechaFin" />
          </>
        );
      case 'Colección':
        return (
          <>
            <label>Nombre:</label>
            <input type="text" name="nombre" />
            <label>Descripción:</label>
            <textarea name="descripcion" />
          </>
        );
      case 'Categoría':
        return (
          <>
            <label>Nombre:</label>
            <input type="text" name="nombre" />
            <label>Descripción:</label>
            <textarea name="descripcion" />
          </>
        );
      case 'Colores':
        return (
          <>
            <label>Nombre:</label>
            <input type="text" name="nombre" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`card ${isFormVisible ? 'card-expanded' : ''}`} ref={cardRef}>
      <h2>{text}</h2>
      {!isFormVisible ? (
        <div className="card-buttons">
          <button className="add-button" onClick={handleAddClick}>Agregar</button>
          <button className="delete-button">Eliminar</button>
        </div>
      ) : (
        <div className="card-form">
          {renderFormFields()}
          <div className="form-buttons">
            <button className="accept-button">Aceptar</button>
            <button className="cancel-button" onClick={() => { setFormVisible(false); onClose(); }}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
