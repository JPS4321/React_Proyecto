import React from 'react';
import './ScrollToTopButton.css';
import upArrowIcon from '../../assets/icons8-flecha-arriba-larga-100.png'; 

const ScrollToTopButton = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="scroll-to-top">
      <button onClick={scrollToTop} className="scroll-button">
        <img src={upArrowIcon} alt="Scroll to top" className="scroll-icon" />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
