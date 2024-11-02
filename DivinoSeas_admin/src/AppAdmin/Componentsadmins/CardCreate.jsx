
import React, { useState, useEffect, useRef } from 'react';
import useCategory from '../hooks/useCategory'; // Importa el hook

const Card = ({ text, isActive, onClick, onClose }) => {
  const { addCategory } = useCategory(); // Destructura la función addCategory del hook
  const [isFormVisible, setFormVisible] = useState(false);
  const [isDeleteFormVisible, setDeleteFormVisible] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const cardRef = useRef(null);

  // Manejador para cerrar otras tarjetas al abrir una
  useEffect(() => {
    if (!isActive) {
      setFormVisible(false);
      setDeleteFormVisible(false);
    }
  }, [isActive]);

  // Manejador para detectar clics fuera de la tarjeta
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setFormVisible(false);
        setDeleteFormVisible(false);
        onClose();
      }
    };

    if (isFormVisible || isDeleteFormVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormVisible, isDeleteFormVisible, onClose]);

  const handleAddClick = () => {
    onClick();
    setFormVisible(true);
  };
  
  const handleDeleteClick = () => {
    onClick();
    setDeleteFormVisible(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAcceptClick = () => {
    if (formData.nombre && formData.descripcion) {
      addCategory(formData); // Llama a la función addCategory con los datos del formulario
      setFormVisible(false);
      setFormData({ nombre: '', descripcion: '' }); // Limpia el formulario
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const renderFormFields = () => {
    switch (text) {
      case 'Promociones':
        return (
          <>
            <label>Descripción:</label>
            <textarea name="descripcion" onChange={handleInputChange} />
            <label>Descuento:</label>
            <input type="number" step="0.01" name="descuento" onChange={handleInputChange} />
            <label>Fecha Inicio:</label>
            <input type="date" name="fechaInicio" onChange={handleInputChange} />
            <label>Fecha Fin:</label>
            <input type="date" name="fechaFin" onChange={handleInputChange} />
          </>
        );
      case 'Colección':
        return (
          <>
            <label>Nombre:</label>
            <input type="text" name="nombre" onChange={handleInputChange} />
            <label>Descripción:</label>
            <textarea name="descripcion" onChange={handleInputChange} />
          </>
        );
      case 'Categoría':
        return (
          <>
            <label>Nombre:</label>
            <input type="text" name="nombre" onChange={handleInputChange} />
            <label>Descripción:</label>
            <textarea name="descripcion" onChange={handleInputChange} />
          </>
        );
      case 'Colores':
        return (
          <>
            <label>Nombre:</label>
            <input type="text" name="nombre" onChange={handleInputChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`card ${isFormVisible || isDeleteFormVisible ? 'card-expanded' : ''}`} ref={cardRef}>
      <h2>{text}</h2>
      {!isFormVisible && !isDeleteFormVisible ? (
        <div className="card-buttons">
          <button className="add-button" onClick={handleAddClick}>Agregar</button>
          <button className="delete-button" onClick={handleDeleteClick}>Eliminar</button>
        </div>
      ) : isFormVisible ? (
        <div className="card-form">
          {renderFormFields()}
          <div className="form-buttons">
            <button className="accept-button" onClick={handleAcceptClick}>Aceptar</button>
            <button className="cancel-button" onClick={() => { setFormVisible(false); onClose(); }}>Cancelar</button>
          </div>
        </div>
      ) : (
        <div className="delete-form">
          <label>Id de categoría para eliminar:</label>
          <input type="text" name="deleteName" />
          <div className="form-buttons">
            <button className="delete-confirm-button">Confirmar</button>
            <button className="cancel-button" onClick={() => setDeleteFormVisible(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
