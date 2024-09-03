import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ imageSrc, hoverImageSrc, title, price }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${title.replace(/\s+/g, '-').toLowerCase()}`);
    };

    return (
        <div className="card" onClick={handleClick}>
            <img src={imageSrc} alt={title} className="card-image" />
            <img src={hoverImageSrc} alt={title} className="hover-image" />
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-price">Q{price}</p> {/* Usar el precio directamente */}
            </div>
        </div>
    );
};

export default ProductCard;
