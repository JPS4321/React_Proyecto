import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import Footer from '../Components/Footer/Footer';
import './pages_css/ProductPage.css';

function ProductPage() {
    const { state } = useLocation(); 
    const navigate = useNavigate();

    if (!state) {
        return <div>Product not found</div>;
    }

    const { title, imageSrc, hoverImageSrc, price, discount } = state;

    const [amount, setAmount] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M'); 

    const increaseAmount = () => {
        setAmount(amount + 1);
    };

    const decreaseAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const addToCart = () => {
        const existingCart = localStorage.getItem('cartItems');
        const cartItems = existingCart ? JSON.parse(existingCart) : [];
    
        // Check if the item already exists in the cart
        const existingItemIndex = cartItems.findIndex(item => item.id === state.id && item.size === selectedSize);
    
        if (existingItemIndex !== -1) {
            // If item exists, update its quantity
            cartItems[existingItemIndex].quantity += amount;
        } else {
            // If not, add new item
            cartItems.push({
                id: state.id,
                name: title,
                price: discountedPrice,
                quantity: amount,
                size: selectedSize
            });
        }
    
        // Save updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
        // Navigate to the Shopping Cart page
        navigate('/ShoppingCart');
    };
    

    const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;

    
    const sizeOptions = [
        { size: 'XS', number: 1 },
        { size: 'S', number: 4 },  
        { size: 'M', number: 3 },
        { size: 'L', number: 0 }   
    ];

    return (
        <div className='ProductPageContainer'>
            <Marquee text='Welcome to Divino Seas' />
            <div className='navigation-bar'>
                <Navbar />
            </div>
            <div className='ProductPageContent'>
                <div className='left-column'>
                    <img src={imageSrc} alt='Product Image 1' />
                    <img src={hoverImageSrc} alt='Product Image 2' />
                </div>
                <div className='right-column'>
                    <h1 className='Title'>{title}</h1>
                    <p className='Price'>
                        {discount > 0 ? (
                            <>
                                <span className='OriginalPrice' style={{ textDecoration: 'line-through', marginRight: '10px' }}>
                                    Q{price.toFixed(2)}
                                </span>
                                <span className='DiscountedPrice' style={{ fontWeight: 'bold', color: 'black' }}>
                                    Q{discountedPrice.toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <>Q{price.toFixed(2)}</>
                        )}
                    </p>
                    <p className='Size'>Size: {selectedSize}</p>
                    <div className='SizesButtonRow'>
                        {sizeOptions.map((option) => (
                            <button
                                key={option.size}
                                className={`sizeButton ${selectedSize === option.size ? 'selected' : ''} ${option.number === 0 ? 'disabledButton' : ''}`} 
                                onClick={() => handleSizeClick(option.size)}
                                disabled={option.number === 0}  
                            >
                                {option.size} 
                            </button>
                        ))}
                    </div>
                    <div className="CounterContainer">
                        <p className="CounterLabel">Amount:</p>
                        <div className="Counter">
                            <button className="CounterButton" onClick={decreaseAmount}>-</button>
                            <p className="CounterValue">{amount}</p>
                            <button className="CounterButton" onClick={increaseAmount}>+</button>
                        </div>
                        <button className="addToCartButton" onClick={addToCart}>Add to Cart</button>
                    </div>
                    <hr />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductPage;
