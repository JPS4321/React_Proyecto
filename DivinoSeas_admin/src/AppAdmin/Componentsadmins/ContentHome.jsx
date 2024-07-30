import React from 'react';
import "../styles/Contenthome.css";
import divinoImage from '../../assets/divino.jpeg';

const ContenidoHome = () => {
  const username = 'Sofia'; 

  return (
    <div className="contenidos">
      <h1 className="welcome-message">Welcome back, {username}</h1>
      <img src={divinoImage} alt="Divino" className="welcome-image" />
    </div>
  );
}

export default ContenidoHome;
