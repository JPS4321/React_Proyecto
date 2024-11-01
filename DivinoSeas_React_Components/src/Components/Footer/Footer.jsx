import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h3 className="footer-title">Contacto</h3>
        <p>Dirección: 123 Street, City, Country</p>
        <p>Teléfono: +502 12345678</p>
        <p>Correo: example@example.com</p>
      </div>
      <div className="footer-column">
        <h3 className="footer-title">Dvino Seas</h3>
        <p>Sobre Nosotros</p>
        <p>Nuestros Servicios</p>
        <p>Política de Privacidad</p>
      </div>
      <div className="footer-column">
        <h3 className="footer-title">¡Síguenos!</h3>
        <p>Facebook</p>
        <p>X</p>
        <p>Instagram</p>
      </div>
    </footer>
  );
};

export default Footer;
