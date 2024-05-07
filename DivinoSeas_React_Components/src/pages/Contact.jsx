import React from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import './pages_css/Contact.css';

function Contact() {
    return (
        <div className='container'>
            <Marquee text='Welcome to Divino Seas'/>
            <div className='navigation-bar'>
                <Navbar/>
            </div>
            <div className="contact-section">
                <h2>GET IN TOUCH</h2>
                <p>We would love to hear from you.</p>
                <form>
                    <div className="input-flex-container">
                        <input type="text" name="name" placeholder="Nombre" aria-label="Nombre" />
                        <input type="email" name="email" placeholder="Correo electrónico" aria-label="Correo electrónico" />
                    </div>
                    <textarea name="message" placeholder="Mensaje" aria-label="Mensaje"></textarea>
                    <div className="checkbox-container">
                        <input type="checkbox" id="save-info" name="save-info" aria-label="Guardar información" />
                        <label htmlFor="save-info">
                            Guarde mi nombre, correo electrónico y sitio web en este navegador para la próxima vez que comente.
                        </label>
                    </div>
                    <button type="submit" className="submit-button">ENVIAR AHORA</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
