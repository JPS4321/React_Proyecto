import React, { useState } from 'react';

const InventoryForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [xs, setXs] = useState(0);
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [l, setL] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, image, xs, s, m, l });
    onClose();
  };

  return (
    <div className="form-container" style={formStyles.formContainer}>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <label style={formStyles.label}>
          Nombre:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={formStyles.input} />
        </label>
        <label style={formStyles.label}>
          Imagen:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} style={formStyles.input} />
        </label>
        <label style={formStyles.label}>
          Cantidad XS:
          <input type="number" value={xs} onChange={(e) => setXs(e.target.value)} style={formStyles.input} />
        </label>
        <label style={formStyles.label}>
          Cantidad S:
          <input type="number" value={s} onChange={(e) => setS(e.target.value)} style={formStyles.input} />
        </label>
        <label style={formStyles.label}>
          Cantidad M:
          <input type="number" value={m} onChange={(e) => setM(e.target.value)} style={formStyles.input} />
        </label>
        <label style={formStyles.label}>
          Cantidad L:
          <input type="number" value={l} onChange={(e) => setL(e.target.value)} style={formStyles.input} />
        </label>
        <div style={formStyles.buttonContainer}>
          <button type="submit" style={formStyles.submitButton}>Agregar</button>
          <button type="button" onClick={onClose} style={formStyles.cancelButton}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

const formStyles = {
  formContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    border: '3px solid #000000',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    zIndex: '1001',

  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    marginBottom: '10px',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'center',
    color: 'black'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  submitButton: {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    marginRight: '10px',
  },
  cancelButton: {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    backgroundColor: '#f44336',
    color: 'white',
  },
};

export default InventoryForm;
