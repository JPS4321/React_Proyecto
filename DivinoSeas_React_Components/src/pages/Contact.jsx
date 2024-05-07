import React from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import './pages_css/Contact.css';

function Contact() {
    return (
        <div className='page-container'>
            <Marquee text='Welcome to Divino Seas'/>
            <div className='navigation-bar'>
                <Navbar/>
            </div>
            <div className="contact-section">
                <h2>GET IN TOUCH</h2>
                <p>We would love to hear from you.</p>
                
            </div>
        </div>
    );
}

export default Contact;
