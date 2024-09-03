import React, { useState, useEffect } from 'react';

const ShippingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    avenida: '',
    numero: '',
    colonia: '',
    zona: '',
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (formSubmitted) {
      validateForm();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (validateForm()) {
      // Proceed to next step
      console.log('Form is valid, continue to shipping method');
    }
  };

  // Customize the native validation messages
  useEffect(() => {
    const inputs = document.querySelectorAll('input, select');

    inputs.forEach((input) => {
      input.oninvalid = function (e) {
        e.target.setCustomValidity('Este espacio debe ser llenado');
      };

      input.oninput = function (e) {
        e.target.setCustomValidity('');
      };
    });
  }, []);

  return (
    <form className="shipping-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleInputChange}
        className={errors.firstName ? 'error' : ''}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleInputChange}
        className={errors.lastName ? 'error' : ''}
        required
      />
      <input
        type="text"
        name="avenida"
        placeholder="Avenida"
        value={formData.avenida}
        onChange={handleInputChange}
        className={errors.avenida ? 'error' : ''}
        required
      />
      <input
        type="text"
        name="numero"
        placeholder="Número de Casa/Apartamento"
        value={formData.numero}
        onChange={handleInputChange}
        className={errors.numero ? 'error' : ''}
        required
      />
      <input
        type="text"
        name="colonia"
        placeholder="Colonia"
        value={formData.colonia}
        onChange={handleInputChange}
        className={errors.colonia ? 'error' : ''}
        required
      />
      <select
        name="zona"
        value={formData.zona}
        onChange={handleInputChange}
        className={errors.zona ? 'error' : ''}
        required
      >
        <option value="">Seleccionar Zona</option>
        {[...Array(22)].map((_, i) => (
          <option key={i} value={`zona ${i + 1}`}>{`Zona ${i + 1}`}</option>
        ))}
      </select>
      <button type="submit" className="submit-button">Continue to Shipping Method</button>
      {Object.keys(errors).length > 0 && (
        <div className="error-message">All fields are required.</div>
      )}
    </form>
  );
};

export default ShippingForm;
