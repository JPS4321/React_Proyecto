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
            <div className="text-section" style={{ padding: '20px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>About us</h1>
              <div className="first_text" style={{ textAlign: 'justify', padding: '20px', backgroundColor: 'white' }}>
                <p>A young Guatemalan girl once dreamed of changing the world by helping those in need.</p>
              </div>
              <div className="second_text" style={{ textAlign: 'justify', color: "gray", maxWidth: "800px",lineHeight: "2",fontSize: "1.0em"}}>
                <p>With a group of like-minded individuals, she formed Divinoseas: A clothing company dedicated to assisting the poor through its unique business model and production process, determined to design swimwear that makes women feel comfortable in their own bodies, Divinoseas produces bikinis with the philosophy that every body type is inherently beautiful. At Divinoseas, our goal is to give you the garments that perfectly suit your needs—and make you feel sexy at the same time.</p>
                <p>.</p>
              <p>Our brand is inspired by G-D and every one of His divine creations. In recognition of that—we want to give back. Divinoseas creates employment opportunities to women with low resources in Guatemala, whose skilled embroidery work gives special meaning to our labels which say: “handmade.” Our mission is to help as many people as possible; so that they may fulfill their dreams—and experience G-D’s love. Gandhi said, “In a gentle way, you can shake the world.” we agree. At Divinoseas, we dare to realize that young Guatemalan girl’s dream—by shaking the world—for the betterment of all. </p>
              </div>
            </div>
        
          </div>
        </div>
    );
}

export default AboutUs;