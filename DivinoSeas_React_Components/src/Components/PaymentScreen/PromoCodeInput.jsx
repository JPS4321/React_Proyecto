import React, { useState } from 'react';

const PromoCodeInput = () => {
  const [code, setCode] = useState('');

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="promo-code">
      <input type="text" value={code} onChange={handleChange} placeholder="Enter promo code" />
      <button>Apply</button>
    </div>
  );
};

export default PromoCodeInput;
