import React from 'react';
import { useNavigate } from 'react-router-dom'; 


const ProductCard = ({ imageSrc, title, price }) => {
  return (
    <div style={styles.card}>
      <img src={imageSrc} alt={title} style={styles.image} />
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.price}>${price}</p>
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
