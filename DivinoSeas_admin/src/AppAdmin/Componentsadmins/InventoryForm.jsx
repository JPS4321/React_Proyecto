import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InventoryForm.css';

const InventoryForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [xs, setXs] = useState(0);
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [l, setL] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, image, xs, s, m, l });
    navigate('/Stock');
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
      <h2 className="form-title">Añadir Producto</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Nombre del producto:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" />
        </label>
        <label className="label">
          Imagen:
          <input type="file" onChange={handleImageChange} className="input-file" />
          <div className="drag-drop-area">
            Arrastra una imagen aquí o haz clic para seleccionar.
          </div>
        </label>
        <div className="sizes-container">
          <label className="size-label">
            XS:
            <input type="number" value={xs} onChange={(e) => setXs(e.target.value)} className="input-size" />
          </label>
          <label className="size-label">
            S:
            <input type="number" value={s} onChange={(e) => setS(e.target.value)} className="input-size" />
          </label>
          <label className="size-label">
            M:
            <input type="number" value={m} onChange={(e) => setM(e.target.value)} className="input-size" />
          </label>
          <label className="size-label">
            L:
            <input type="number" value={l} onChange={(e) => setL(e.target.value)} className="input-size" />
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
