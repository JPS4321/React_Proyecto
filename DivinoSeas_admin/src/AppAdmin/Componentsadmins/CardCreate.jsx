import React, { useState, useEffect, useRef } from 'react';
import useCategory from '../hooks/useCategory'; 
import useColeccion from '../hooks/useColeccion';
import usePromocion from '../hooks/usePromocion'; 
import useColor from '../hooks/useColor'; 

const Card = ({ text, isActive, onClick, onClose }) => {
  const { addCategory, deleteCategory } = useCategory(); 
  const { addPromotions, deletePromotions } = usePromocion(); 
  const { addColors, deleteColors } = useColor(); 
  const { addCollection, deleteCollection } = useColeccion(); 
  const [isFormVisible, setFormVisible] = useState(false);
  const [isDeleteFormVisible, setDeleteFormVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [deleteId, setDeleteId] = useState('');
  const cardRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setFormVisible(false);
      setDeleteFormVisible(false);
    }
  }, [isActive]);

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
    setFormData({}); // Resetea el formData al abrir el formulario
  };

  const handleDeleteClick = () => {
    onClick();
    setDeleteFormVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAcceptClick = async () => {
    switch (text) {
      case 'Categoría':
        if (formData.nombre && formData.descripcion) {
          await addCategory(formData);
        } else {
          alert('Por favor, completa todos los campos.');
          return;
        }
        break;
      case 'Colección':
        if (formData.nombre && formData.descripcion) {
          await addCollection(formData);
        } else {
          alert('Por favor, completa todos los campos.');
          return;
        }
        break;
      case 'Colores':
        if (formData.nombre) {
          await addColors(formData);
        } else {
          alert('Por favor, completa el campo de nombre.');
          return;
        }
        break;
      case 'Promociones':
        if (formData.descripcion && formData.descuento && formData.fechaInicio && formData.fechaFin) {
          await addPromotions(formData);
        } else {
          alert('Por favor, completa todos los campos.');
          return;
        }
        break;
      default:
        alert('Funcionalidad no implementada para esta tarjeta');
        return;
    }
    setFormVisible(false);
    setFormData({});
  };

  const handleDeleteConfirmClick = async () => {
    if (deleteId) {
      switch (text) {
        case 'Categoría':
          await deleteCategory(deleteId);
          break;
        case 'Colección':
          await deleteCollection(deleteId);
          break;
        case 'Colores':
          await deleteColors(deleteId);
          break;
        case 'Promociones':
          await deletePromotions(deleteId);
          break;
        default:
          alert('Funcionalidad no implementada para esta tarjeta');
          return;
      }
      setDeleteFormVisible(false);
      setDeleteId('');
    } else {
      alert('Por favor, proporciona un ID válido para eliminar.');
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
          <label>Id para eliminar:</label>
          <input type="text" name="deleteId" onChange={(e) => setDeleteId(e.target.value)} />
          <div className="form-buttons">
            <button className="delete-confirm-button" onClick={handleDeleteConfirmClick}>Confirmar</button>
            <button className="cancel-button" onClick={() => setDeleteFormVisible(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
