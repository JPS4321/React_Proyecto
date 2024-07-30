import React from 'react';
import { useNavigate } from 'react-router-dom'; 


const ProductCard = ({ imageSrc, title, price }) => {
  const navigate = useNavigate();

  const handleClick = () => {
      navigate(`/products/${title.replace(/\s+/g, '-').toLowerCase()}`);
  };

  return (
      <div className="card" onClick={handleClick}>
          <img src={imageSrc} alt={title} className="card-image" />
          <div className="card-content">
              <h2 className="card-title">{title}</h2>
              <p className="card-price">${price}</p>
          </div>
      </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  content: {
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#555',
  },
};

export default ProductCard;
