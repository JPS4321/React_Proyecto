import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ id, title, imageSrc, hoverImageSrc, price, discount }) {
  const [hoverImageBase64, setHoverImageBase64] = useState('');
  const navigate = useNavigate();

  const formattedPrice = Number(price) || 0;
  const discountedPrice = discount > 0 ? formattedPrice - (formattedPrice * discount) / 100 : formattedPrice;

  useEffect(() => {
    // Verifica si hoverImageSrc es un objeto Buffer (indicado por la propiedad 'data' y 'type')
    if (hoverImageSrc?.data && hoverImageSrc.type === 'Buffer') {
      // Convierte el buffer a un Blob y luego a una URL base64
      const byteArray = new Uint8Array(hoverImageSrc.data);
      const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Cambia 'image/jpeg' si es otro tipo
      const reader = new FileReader();

      reader.onloadend = () => {
        setHoverImageBase64(reader.result); // reader.result contiene la cadena base64
      };

      reader.readAsDataURL(blob); // Convierte el Blob en base64
    } else {
      setHoverImageBase64(hoverImageSrc); // Si ya es una cadena válida, úsala directamente
    }
  }, [hoverImageSrc]);

  const handleClick = () => {
    navigate(`/products/${id}`, {
      state: { id, title, imageSrc, hoverImageBase64, price: formattedPrice, discount }
    });
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={imageSrc} alt={title} className="card-image" />
      <img src={hoverImageBase64} alt={`${title} - Hover`} className="hover-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        {discount > 0 ? (
          <div className="card-price">
            <span className="original-price">Q{formattedPrice.toFixed(2)}</span>
            <span className="discounted-price">Q{discountedPrice.toFixed(2)}</span>
          </div>
        ) : (
          <div className="card-price">Q{formattedPrice.toFixed(2)}</div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
