import React from 'react';

const PaymentOptions = () => {
  return (
    <div className="payment-options">
      <button className="payment-button">Apple Pay</button>
      <button className="payment-button">PayPal</button>
      <button className="payment-button">Amazon Pay</button>
    </div>
  );
};

export default PaymentOptions;
