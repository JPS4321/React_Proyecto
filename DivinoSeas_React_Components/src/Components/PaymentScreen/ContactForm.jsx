import React, { useState } from 'react';

const ContactForm = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <form className="contact-form">
      <label>Email:
        <input type="email" value={email} onChange={handleChange} placeholder="Enter your email" />
      </label>
    </form>
  );
};

export default ContactForm;
