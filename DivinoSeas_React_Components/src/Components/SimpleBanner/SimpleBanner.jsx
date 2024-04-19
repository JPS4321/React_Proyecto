import React from 'react';

const SimpleBanner = ({ backgroundImage, }) => {
  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`,
      maxWidth: '100%',
      overflow: 'hidden',
      backgroundSize: 'contain', 
      backgroundRepeat: 'no-repeat', 
      margin: '0 auto', 
      backgroundPosition: 'center', 
      height: '250px', 
      display: 'flex', 
      justifyContent: 'center', 
      marginBottom: '20px', 
      alignItems: 'center', 
      textAlign: 'center' ,
    }}>
    
    </div>
  );
};

export default SimpleBanner;
