import React from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import bg from '../assets/AboutUs_place.png';
import Simp from '../Components/SimpleBanner/SimpleBanner';

function AboutUs() {
    return (
        <div className='container'>
      <Marquee text='Welcome to Divino Seas'/>
      <div className='subheader'>
      <Navbar/>
      </div>
      <div className='content'>
        <Simp backgroundImage={bg} buttonText='About Us'/>
        
        </div>
        </div>
    );
}

export default AboutUs;