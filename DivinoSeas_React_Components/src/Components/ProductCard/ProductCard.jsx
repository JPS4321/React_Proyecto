import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ProductCard.css';

function ProductCard({ id, title, imageSrc, hoverImageSrc, price, discount }) {
  const navigate = useNavigate(); 

  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;

  const handleClick = () => {
    navigate(`/products/${title}`, { state: { id, title, imageSrc, hoverImageSrc, price, discount } });
  };

  return (
    <div className="card" onClick={handleClick}> 
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
