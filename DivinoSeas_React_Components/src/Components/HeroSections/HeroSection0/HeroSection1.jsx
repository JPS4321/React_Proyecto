import React from 'react';
import './HeroSection1.css'; // Import CSS file for styling

function HeroSection1({ image1, image2 }) {
    return (
        <div className='HeroSectionContainer'>
            <div className='HeroSectionItem'>
                <img src={image1} alt='Image 1' className='HeroImage' />
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
                <img src={image2} alt='Image 2' className='HeroImage' />
            </div>
        </div>
    );
}

export default HeroSection1;
