import React from 'react';
import './HeroSection1.css'; // Import CSS file for styling

function HeroSection1() {
    return (
        <div className='HeroSectionContainer'>
            <div className='HeroSectionItem'>
                <img src='src/assets/bg-placeholder0.jpg' alt='Image 1' className='HeroImage' />
            </div>
            <div className='HeroSectionItem BlackBox'>
                <div className='BoxContent'>
                    <h2 className='WhiteText'>Black Box</h2>
                </div>
            </div>
            <div className='HeroSectionItem WhiteBox'>
                <div className='BoxContent'>
                    <h2 className='BlackText'>White Box</h2>
                </div>
            </div>
            <div className='HeroSectionItem'>
                <img src='src/assets/bg-placeholder0.jpg' alt='Image 2' className='HeroImage' />
            </div>
        </div>
    );
}

export default HeroSection1;
