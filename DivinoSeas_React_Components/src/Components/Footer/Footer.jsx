import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.column}>
        <h3 style={styles.title}>Contact</h3>
        <p>Address: 123 Street, City, Country</p>
        <p>Phone: +502 12345678</p>
        <p>Email: example@example.com</p>
      </div>
      <div style={styles.column}>
        <h3 style={styles.title}>Company</h3>
        <p>About Us</p>
        <p>Our Services</p>
        <p>Privacy Policy</p>
      </div>
      <div style={styles.column}>
        <h3 style={styles.title}>Follow Us</h3>
        <p>Facebook</p>
        <p>Twitter</p>
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