import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';
import upArrowIcon from '../../assets/icons8-flecha-arriba-larga-100.png'; 

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {visible && (
        <button onClick={scrollToTop} className="scroll-button">
          <img src={upArrowIcon} alt="Scroll to top" className="scroll-icon" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
