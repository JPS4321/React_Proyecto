import React from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import image from '../assets/bottom01.png';

function ProductPage() {
    return (
        <div className='container'>
            <Marquee text='Welcome to Divino Seas' />
            <div className='subheader'>
                <Navbar />
            </div>
            <div className='content'>
                <div className='left-column'>
                    <img src= {image} alt='Product Image 1' />
                    <img src='AnadeBreatanaBlueAtoll_Bottom01.png' alt='Product Image 2' />
                </div>
                <div className='right-column'>
                    <p>Here is some text that can be styled and placed as needed.</p>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
