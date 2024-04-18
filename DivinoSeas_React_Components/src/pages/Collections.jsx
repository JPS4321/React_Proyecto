import React from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';

function Collections() {
    return (
        <div className='container'>
            <Marquee text='Welcome to Divino Seas' />
            <div className='subheader'>
                <Navbar />
            </div>
        </div>
    );
}

export default Collections;