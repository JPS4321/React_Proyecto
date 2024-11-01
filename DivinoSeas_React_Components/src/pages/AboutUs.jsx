import React from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import bg from '../assets/AboutUs_place.png';
import Simp from '../Components/SimpleBanner/SimpleBanner';
import mundo from '../assets/mundo.png';
import ex_1 from '../assets/exchange_1.png';
import ex_2 from '../assets/exchange_2.png';
import ex_3 from '../assets/exchange_3.png';
import ex_4 from '../assets/exchange_4.png';
import './pages_css/AboutUs.css';
import Footer from '../Components/Footer/Footer';

function AboutUs() {
  return (
    <div className='about-container'>
      <Marquee text='Welcome to Divino Seas' />
      <Navbar />
      <div className='content'>
        <Simp backgroundImage={bg} buttonText='About Us' />
        
        <div className="text-section">
          <h1>About us</h1>
          <div className="first-text">
            <p>A young Guatemalan girl once dreamed of changing the world by helping those in need.</p>
          </div>
          <div className="second-text">
            <p>With a group of like-minded individuals, she formed Divinoseas...</p>
            <p>Our brand is inspired by G-D and every one of His divine creations...</p>
            <p>“In a gentle way, you can shake the world.” we agree...</p>
          </div>
        </div>

        <div className="information-section">
          <img src={mundo} alt="World Map" className="world-map" />
          <div className="services-section">
            <div className="service">
              <img src={ex_1} alt="Returns" />
              <div>
                <h2>Returns & Refunds</h2>
                <p className="gray-text">Online returns center.</p>
              </div>
            </div>
            <div className="service">
              <img src={ex_2} alt="Payments" />
              <div>
                <h2>All Payment Methods</h2>
                <p className="gray-text">Apple Pay and all cards.</p>
              </div>
            </div>
            <div className="service">
              <img src={ex_3} alt="Shipping" />
              <div>
                <h2>Worldwide Shipping</h2>
                <p className="gray-text">Fast shipments.</p>
              </div>
            </div>
            <div className="service">
              <img src={ex_4} alt="Free Shipping" />
              <div>
                <h2>Free Shipping</h2>
                <p className="gray-text">Free Shipping on U.S. orders over $200.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
