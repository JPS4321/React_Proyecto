import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import CartItem from '../Components/CartItem/CartItem';
import Footer from '../Components/Footer/Footer';
import './pages_css/ShoppingCart.css';

function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(savedCartItems);
    }, []);  // Empty dependency array to run once on component mount

    const navigate = useNavigate(); 

    const handleIncrement = (id) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handleDecrement = (id) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handleRemove = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = () => {
        navigate('/PaymentScreen');
    };

    return (
        <div className='container'>
            <Marquee text='Your Shopping Cart'/>
            <div className='navigation-bar'>
                <Navbar/>
            </div>
            <div className='content'>
                <div className="cart-section" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1>Your Cart</h1>
                    <div className="cart-items" style={{ width: '100%', maxWidth: '800px' }}>
                        {cartItems.map(item => (
                            <CartItem 
                                key={item.id} 
                                item={item} 
                                onIncrement={handleIncrement} 
                                onDecrement={handleDecrement} 
                                onRemove={handleRemove} 
                            />
                        ))}
                    </div>
                    <div className="total-section" style={{ padding: '20px', marginTop: '20px', width: '100%', maxWidth: '800px', textAlign: 'right', fontSize: '1.5em', fontWeight: 'bold' }}>
                        Total: ${totalAmount.toFixed(2)}
                    </div>
                    <button 
                        className="checkout-button" 
                        style={{ padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2em' }}
                        onClick={handleCheckout} 
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ShoppingCart;
