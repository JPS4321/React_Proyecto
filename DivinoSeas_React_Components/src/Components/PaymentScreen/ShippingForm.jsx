import React from 'react';

const ShippingForm = () => {
  return (
    <form className="shipping-form">
      <input type="text" placeholder="First Name" required />
      <input type="text" placeholder="Last Name" required />

      <input type="text" placeholder="Avenida" required />
      <input type="text" placeholder="Número de Casa/Apartamento" required />
      <input type="text" placeholder="Colonia" required />

      <select required>
        <option value="">Seleccionar Zona</option>
        {[...Array(22)].map((_, i) => (
          <option key={i} value={`zona ${i + 1}`}>{`Zona ${i + 1}`}</option>
        ))}
      </select>
    </form>
  );
};

export default ShippingForm;
