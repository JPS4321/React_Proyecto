import React, { useState } from 'react';
import './PromoCodeInput.css';

const PromoCodeInput = ({ applyDiscount }) => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
  const promoCodes = {
    'JUANFER': 90,
    'SAVE10': 10,
    'DISCOUNT20': 20,
    'HALFOFF': 50,
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleApply = () => {
    const discount = promoCodes[code.toUpperCase()];
    if (discount) {
      applyDiscount(discount); // Call parent function to apply the discount
      setErrorMessage(''); // Clear any previous error message
    } else {
      setErrorMessage('Invalid Promo Code');
    }
  };

  return (
    <div className="promo-code">
      <input 
        type="text" 
        value={code} 
        onChange={handleChange} 
        placeholder="Enter promo code" 
      />
      <button onClick={handleApply}>Apply</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default PromoCodeInput;
