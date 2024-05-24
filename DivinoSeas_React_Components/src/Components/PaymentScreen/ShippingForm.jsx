import React from 'react';

const ShippingForm = () => {
  return (
    <div className="shipping-form">
      {/* Fields for shipping information */}
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
      <input type="text" placeholder="Address" />
      {/* Espacions adicionales van a ir aquí */}
    </div>
  );
};

export default ShippingForm;
