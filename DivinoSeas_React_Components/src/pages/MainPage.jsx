import React from 'react';
import Navbar from '../Components/NavBar/Navbar'
import Marquee from '../Components/Marquee/Marquee'
import ProductCard from '../Components/ProductCard/ProductCard'
import HeroSection0 from '../Components/HeroSections/HeroSection0/HeroSection0'
import Footer from '../Components/Footer/Footer'
import place from '../assets/placeholder0.png'
import bg from '../assets/bg-placeholder0.jpg'
import HeroSection1 from '../Components/HeroSections/HeroSection0/HeroSection1';
import ScrollToTopButton from '../Components/ScrollToTopButton/ScrollToTopButton';

const Home = () => {
    return (
        <div className='container'>
      
      <div className='subheader'>
      <Marquee text='Welcome to Divino Seas'/>
      <Navbar/>
      </div>
      <HeroSection0 backgroundImage={bg} buttonText="Shop Now"/>
      <HeroSection1 image1={bg} image2={bg}/>
      <ScrollToTopButton/>
      

      <Footer/>
    </div>
    );
}

export default Home;