import React, { useState } from 'react';
import './PromoCodeInput.css'; // Assuming you will style the error message in a separate CSS file

const PromoCodeInput = () => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setCode(e.target.value);
    if (errorMessage) {
      setErrorMessage(''); // Clear error message when typing a new code
    }
  };

  // Placeholder validation function
  const validatePromoCode = () => {
    // For now, let's just assume that no code is valid.
    // You can replace this with actual validation logic later.
    if (code !== 'VALIDPROMO') {
      return false;
    }
    return true;
  };

  const handleApply = () => {
    if (!validatePromoCode()) {
      setErrorMessage('Invalid Promo Code');
    } else {
      setErrorMessage(''); // Clear error if the promo code is valid
      // You can also handle applying the valid promo code here
      alert('Promo code applied!');
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
