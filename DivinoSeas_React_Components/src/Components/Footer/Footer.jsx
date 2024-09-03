import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.column}>
        <h3 style={styles.title}>Contacto</h3>
        <p>Dirección: 123 Street, City, Country</p>
        <p>Teléfono: +502 12345678</p>
        <p>Correo: example@example.com</p>
      </div>
      <div style={styles.column}>
        <h3 style={styles.title}>Dvino Seas</h3>
        <p>Sobre Nostros</p>
        <p>Nuestros Servicios</p>
        <p>Politica de Privacidad</p>
      </div>
      <div style={styles.column}>
        <h3 style={styles.title}>¡Siguenos!</h3>
        <p>Facebook</p>
        <p>X</p>
        <p>Instagram</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  column: {
    flex: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: '20px',
    marginBottom: '10px',
  },
};

export default Footer;