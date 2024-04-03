import React from 'react';

const HeroSection0 = ({ backgroundImage, buttonText }) => {
  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`,
      maxWidth: '100%',
      overflow: 'hidden',
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '400px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center' 
    }}>
      <button style={{ 
        padding: '12px 24px', 
        fontSize: '20px', 
        fontWeight: 'bold', 
        backgroundColor: '#333', 
        color: '#fff', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer' 
      }}>{buttonText}</button>
    </div>
  );
};

export default HeroSection0;
