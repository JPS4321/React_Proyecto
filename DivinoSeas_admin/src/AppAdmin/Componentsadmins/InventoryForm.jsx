import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InventoryForm.css';

const InventoryForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [xs, setXs] = useState(0);
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [l, setL] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description && price && category && image && xs >= 0 && s >= 0 && m >= 0 && l >= 0) {
      console.log({ name, description, price, category, image, xs, s, m, l });
      onClose(); 
      navigate('/Stock'); 
    } else {
      alert('Por favor completa todos los campos antes de agregar el producto.');
    }
  };

  const handleCancel = () => {
    onClose();  
    navigate('/Stock');  
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">AÑADIR PRODUCTO</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Nombre del producto:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" required />
        </label>
        <label className="label">
          Descripción:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input textarea" required />
        </label>
        <label className="label">
          Precio:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input" required />
        </label>
        <label className="label">
          Categoría:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="input" required />
        </label>
        <label className="label">
          Imagen:
          <input type="file" onChange={handleImageChange} className="input-file" required />
          <div className="drag-drop-area">
            Arrastra una imagen aquí o haz clic para seleccionar.
          </div>
        </label>
        <div className="sizes-container">
          <label className="size-label">
            XS:
            <input type="number" value={xs} onChange={(e) => setXs(e.target.value)} className="input-size" min="0" required />
          </label>
          <label className="size-label">
            S:
            <input type="number" value={s} onChange={(e) => setS(e.target.value)} className="input-size" min="0" required />
          </label>
          <label className="size-label">
            M:
            <input type="number" value={m} onChange={(e) => setM(e.target.value)} className="input-size" min="0" required />
          </label>
          <label className="size-label">
            L:
            <input type="number" value={l} onChange={(e) => setL(e.target.value)} className="input-size" min="0" required />
          </label>
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">Agregar</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;
