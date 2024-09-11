import React, { useState } from 'react';
import './ContactsSec.css';

function ContactSec() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = 'El nombre es obligatorio';
        }
        if (!formData.email) {
            newErrors.email = 'El correo electrónico es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El correo electrónico no es válido';
        }
        if (!formData.message) {
            newErrors.message = 'El mensaje es obligatorio';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Mensaje enviado'); 
            setFormData({
                name: '',
                email: '',
                message: '',
            });
        }
    };

    return (
        <div className="contact-section">
            <h2>GET IN TOUCH</h2>
            <p>We would love to hear from you.</p>
            <form onSubmit={handleSubmit}>
                <div className="input-flex-container">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder={errors.name ? errors.name : "Nombre"} 
                        aria-label="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'input-error' : ''}
                    />
                    
                    <input 
                        type="email" 
                        name="email" 
                        placeholder={errors.email ? errors.email : "Correo electrónico"} 
                        aria-label="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                    />
                </div>

                <textarea 
                    name="message" 
                    placeholder={errors.message ? errors.message : "Mensaje"} 
                    aria-label="Mensaje"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'input-error' : ''}
                ></textarea>

                <button type="submit" className="submit-button">ENVIAR AHORA</button>
            </form>
        </div>
    );
}

export default ContactSec;
