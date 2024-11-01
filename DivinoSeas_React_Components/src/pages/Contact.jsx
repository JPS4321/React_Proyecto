import React from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import ContactSec from '../Components/ContactsSec/ContactsSec';
import './pages_css/Contact.css';

function Contact() {
    return (
        <div className='page-container'>
            <Marquee text='Welcome to Divino Seas' />
            <Navbar />
            <ContactSec />
        </div>
    );
}

export default Contact;
