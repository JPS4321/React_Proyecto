import React from 'react';
import './OrderSummary.css';

const OrderSummary = ({ price, discount }) => {
  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="price-details">
        {discount > 0 ? (
          <div>
            <span className="original-price">Original Price: Q{price.toFixed(2)}</span>
            <span className="discounted-price">Discounted Price: Q{discountedPrice.toFixed(2)} ({discount}% off)</span>
          </div>
        ) : (
          <div className="final-price">
            Price: Q{price.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
