import React from 'react';
import './CartItem.css';
import placeholderImage from '../../assets/bottom01.png'; // Import placeholder image

function CartItem({ item, onIncrement, onDecrement, onRemove }) {
    const handleIncrement = () => {
        onIncrement(item.id);
        updateLocalStorageCart(item.id, 'increment');
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            onDecrement(item.id);
            updateLocalStorageCart(item.id, 'decrement');
        }
    };

    const handleRemove = () => {
        onRemove(item.id);
        updateLocalStorageCart(item.id, 'remove');
    };

    const updateLocalStorageCart = (itemId, action) => {
        let existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (action === 'remove') {
            existingCart = existingCart.filter(cartItem => cartItem.id !== itemId);
        } else if (action === 'increment') {
            existingCart = existingCart.map(cartItem =>
                cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
        } else if (action === 'decrement') {
            existingCart = existingCart.map(cartItem =>
                cartItem.id === itemId && cartItem.quantity > 1
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
        }

        localStorage.setItem('cartItems', JSON.stringify(existingCart));
    };

    return (
        <div className="cart-item">
            {/* Product Image */}
            <img src={item.image || placeholderImage} alt={item.name} className="cart-item-image" />
            
            {/* Product Details */}
            <div className="cart-item-details">
                <h2 className="cart-item-name">{item.name}</h2>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <div className="cart-item-quantity">
                    <button className="quantity-button" onClick={handleDecrement}>-</button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button className="quantity-button" onClick={handleIncrement}>+</button>
                </div>
            </div>
            
            <button className="remove-button" onClick={handleRemove}>Remove</button>
        </div>
    );
}

export default CartItem;
