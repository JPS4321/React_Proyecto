import React, { useState } from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import image from '../assets/bottom01.png';
import Footer from '../Components/Footer/Footer';

function ProductPage() {
    const [amount, setAmount] = useState(1);

    const increaseAmount = () => {
        setAmount(amount + 1);
    };

    const decreaseAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };

    const addToCart = () => {
        // Add logic to add item to cart
    };

    return (
        <div className='ProductPageContainer'>
            <Marquee text='Welcome to Divino Seas' />
            <div className='subheader'>
                <Navbar />
            </div>
            <div className='ProductPageContent'>
                <div className='left-column'>
                    <img src={image} alt='Product Image 1' />
                    <img src={image} alt='Product Image 2' />
                </div>
                <div className='right-column'>
                    <h1 className='Title'>Product Title</h1>
                    <p className='Price'>Price</p>
                    <p className='Size'>Size: size</p>
                    <div className='SizesButtonRow'>
                        <button className="sizeButton">XS</button>
                        <button className="sizeButton">S</button>
                        <button className="sizeButton selected">M</button>
                        <button className="sizeButton">L</button>
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
                    
                    <p>Description</p>
                    <hr />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit augue, ullamcorper nec nunc a, bibendum pulvinar turpis. Vivamus interdum lectus non blandit tincidunt. In laoreet magna purus, varius viverra velit faucibus sed. Nullam suscipit tincidunt sem. Curabitur quis semper ex, eget ultrices quam. Proin sit amet nisl consectetur, porttitor ex quis, tempor elit. Suspendisse eleifend risus sed enim convallis finibus.</p>
                </div>
                
            </div>
            <Footer></Footer>
        </div>
        
    );
}

export default ProductPage;
