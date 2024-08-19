import React from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import bg from '../assets/ShoppingCart_background.png';
import Simp from '../Components/SimpleBanner/SimpleBanner';
import CartItem from '../Components/CartItem/CartItem';
import './pages_css/ShoppingCart.css';
import Footer from '../Components/Footer/Footer';

function ShoppingCart() {
    return (
        <div className='container'>
            <Marquee text='Your Shopping Cart'/>
            <div className='subheader'>
                <Navbar/>
            </div>
            <div className='content'>
                <Simp backgroundImage={bg} buttonText='Checkout'/>
                <div className="cart-section" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1>Your Cart</h1>
                    <div className="cart-items" style={{ width: '100%', maxWidth: '800px' }}>
                        <CartItem />
                        <CartItem />
                        <CartItem />
                    </div>
                    <div className="total-section" style={{ padding: '20px', marginTop: '20px', width: '100%', maxWidth: '800px', textAlign: 'right', fontSize: '1.5em', fontWeight: 'bold' }}>
                        Total: $200.00
                    </div>
                    <button className="checkout-button" style={{ padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2em' }}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ShoppingCart;