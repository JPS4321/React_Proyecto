import React from 'react';

const PaymentOptions = () => {
  const handleButtonClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="payment-options">
      <button 
        className="payment-button" 
        onClick={() => handleButtonClick('https://www.apple.com/apple-pay')}
      >
        Apple Pay
      </button>
      <button 
        className="payment-button" 
        onClick={() => handleButtonClick('https://www.paypal.com')}
      >
        PayPal
      </button>
      <button 
        className="payment-button" 
        onClick={() => handleButtonClick('https://pay.amazon.com')}
      >
        Amazon Pay
      </button>
    </div>
  );
};

export default PaymentOptions;
