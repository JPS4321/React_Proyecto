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
        navigate('/ShoppingCart');
    };

    const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;

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
                                <span className='DiscountedPrice' style={{fontWeight: 'bold',color:'black' }}>
                                    Q{discountedPrice.toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <>Q{price.toFixed(2)}</>
                        )}
                    </p>
                    <p className='Size'>Size: {selectedSize}</p>
                    <div className='SizesButtonRow'>
                        <button 
                            className={`sizeButton ${selectedSize === 'XS' ? 'selected' : ''}`} 
                            onClick={() => handleSizeClick('XS')}>
                            XS
                        </button>
                        <button 
                            className={`sizeButton ${selectedSize === 'S' ? 'selected' : ''}`} 
                            onClick={() => handleSizeClick('S')}>
                            S
                        </button>
                        <button 
                            className={`sizeButton ${selectedSize === 'M' ? 'selected' : ''}`} 
                            onClick={() => handleSizeClick('M')}>
                            M
                        </button>
                        <button 
                            className={`sizeButton ${selectedSize === 'L' ? 'selected' : ''}`} 
                            onClick={() => handleSizeClick('L')}>
                            L
                        </button>
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
