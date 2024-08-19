import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import Footer from '../Components/Footer/Footer';
import image from '../assets/bottom01.png';
import image2 from '../assets/bottom02.png';
import './pages_css/ProductPage.css';

const products = {
    'product-1': { title: 'Product 1', price: '20.00', description: 'Description for Product 1' },
    'product-2': { title: 'Product 2', price: '20.00', description: 'Description for Product 2' },
    'product-3': { title: 'Product 3', price: '20.00', description: 'Description for Product 3' },
    'product-4': { title: 'Product 4', price: '20.00', description: 'Description for Product 4' },
};

function ProductPage() {
    const { productName } = useParams();
    const navigate = useNavigate();
    const productKey = productName.replace(/\s+/g, '-').toLowerCase();
    const product = products[productKey];

    const [amount, setAmount] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M'); // Tamaño por defecto 'M'

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
        // Lógica para añadir el producto al carrito
        navigate('/PaymentScreen');
    };

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className='ProductPageContainer'>
            <Marquee text='Welcome to Divino Seas' />
            <div className='subheader'>
                <Navbar />
            </div>
            <div className='ProductPageContent'>
                <div className='left-column'>
                    <img src={image} alt='Product Image 1' />
                    <img src={image2} alt='Product Image 2' />
                </div>
                <div className='right-column'>
                    <h1 className='Title'>{product.title}</h1>
                    <p className='Price'>${product.price}</p>
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
                    <p>{product.description}</p>
                    <hr />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductPage;
