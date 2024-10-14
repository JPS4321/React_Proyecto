import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './ProductCard.css';

function ProductCard({ id, title, imageSrc, hoverImageSrc, price, discount }) {
  const navigate = useNavigate(); 

  // Asegúrate de que price sea siempre un número
  const formattedPrice = Number(price) || 0;
  const discountedPrice = discount > 0 ? formattedPrice - (formattedPrice * discount) / 100 : formattedPrice;

  const handleClick = () => {
    navigate(`/products/${id}`, { 
      state: { id, title, imageSrc, hoverImageSrc, price: formattedPrice, discount } 
    });
  };

  return (
    <div className="card" onClick={handleClick}> 
      {/* Usa directamente el string base64 tal como lo recibes del backend para la imagen principal */}
      <img src={imageSrc} alt={title} className="card-image" />
      
      {/* Contenido de la tarjeta */}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        {discount > 0 ? (
          <div className="card-price">
            <span className="original-price">Q{formattedPrice.toFixed(2)}</span>
            <span className="discounted-price">Q{discountedPrice.toFixed(2)}</span>
          </div>
        ) : (
          <div className="card-price">
            Q{formattedPrice.toFixed(2)}
          </div>
        )}
      </div>

      {/* Imagen hover debajo del contenido */}
      <img src={hoverImageSrc} alt={`${title} - Hover`} className="hover-image" />
    </div>
  );
}

export default ProductCard;
