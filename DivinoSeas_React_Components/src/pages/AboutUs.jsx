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
import './pages_css/AboutUs.css'
import Footer from '../Components/Footer/Footer'



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
              <div className="second_text" style={{ textAlign: 'justify', color: "gray", maxWidth: "800px",lineHeight: "1.94",fontSize: "1.0em"}}>
                <p>With a group of like-minded individuals, she formed Divinoseas: A clothing company dedicated to assisting the poor through its unique business model and production process, determined to design swimwear that makes women feel comfortable in their own bodies, Divinoseas produces bikinis with the philosophy that every body type is inherently beautiful. At Divinoseas, our goal is to give you the garments that perfectly suit your needs—and make you feel sexy at the same time.</p>
                <p>.</p>
              <p>Our brand is inspired by G-D and every one of His divine creations. In recognition of that—we want to give back. Divinoseas creates employment opportunities to women with low resources in Guatemala, whose skilled embroidery work gives special meaning to our labels which say: “handmade.” Our mission is to help as many people as possible; so that they may fulfill their dreams—and experience G-D’s love. Gandhi said, “In a gentle way, you can shake the world.” we agree. At Divinoseas, we dare to realize that young Guatemalan girl’s dream—by shaking the world—for the betterment of all. </p>
              </div>
            </div>
            <div className="information-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start ', padding: '20px 0' }}>
              <img src={mundo} alt="World Map" style={{ maxWidth: '49%' }} />
              <div className="services-section" style={{ maxWidth: '60%',     paddingLeft: '100px' }}>
               
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px',lineHeight: "1.96" }}>
                  <img src={ex_1} alt="Returns" style={{ marginRight: '10px' }} />
                  <div>
                    <h2>Returns & Refunds</h2>
                    <p className="gray-text">Online returns center.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px',lineHeight: "1.96" }}>
                  <img src={ex_2} alt="Returns" style={{ marginRight: '10px' }} />
                  <div>
                    <h2>All payments methods</h2>
                    <p className="gray-text">Apple Pay and all cards</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px',lineHeight: "1.96" }}>
                  <img src={ex_3} alt="Returns" style={{ marginRight: '10px' }} />
                  <div>
                    <h2>Worldwide Shipping</h2>
                    <p className="gray-text">Fast shipments.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px',lineHeight: "1.96" }}>
                  <img src={ex_4} alt="Returns" style={{ marginRight: '10px' }} />
                  <div>
                    <h2>Free Shipping</h2>
                    <p className="gray-text">Free Shipping on U.S. orderd +$200.</p>
                  </div>
                </div>

                </div>
              </div>
          </div>
          <Footer/>
        </div>
    );
}

export default AboutUs;