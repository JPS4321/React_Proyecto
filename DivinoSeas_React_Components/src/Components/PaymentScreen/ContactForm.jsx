import React from 'react';

const ContactForm = ({ email, setEmail }) => {
  const handleChange = (e) => {
    setEmail(e.target.value); // Actualiza el email en PaymentScreen
  };

  return (
    <form className="contact-form">
      <label>Email:
        <input 
          type="email" 
          value={email} 
          onChange={handleChange} 
          placeholder="Enter your email" 
        />
      </label>
    </form>
  );
};

export default ContactForm;
