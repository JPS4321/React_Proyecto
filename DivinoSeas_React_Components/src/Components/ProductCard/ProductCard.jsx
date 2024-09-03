import React from 'react';
import './ProductCard.css';

function ProductCard({ title, imageSrc, hoverImageSrc, price, discount }) {
  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div className="card">
      <img src={imageSrc} alt={title} className="card-image" />
      <img src={hoverImageSrc} alt={title} className="hover-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        {discount > 0 ? (
          <div className="card-price">
            <span className="original-price">Q{price.toFixed(2)}</span>
            <span className="discounted-price">Q{discountedPrice.toFixed(2)}</span>
          </div>
        ) : (
          <div className="card-price">
            Q{price.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
