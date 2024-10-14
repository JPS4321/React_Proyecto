import React from 'react';
import './CartItem.css';

function CartItem({ item, onIncrement, onDecrement, onRemove }) {

    const handleIncrement = () => {
        onIncrement(item.id);  // Increment logic passed from parent
        updateLocalStorageCart(item.id, 'increment'); // Update localStorage
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            onDecrement(item.id);  // Decrement logic passed from parent
            updateLocalStorageCart(item.id, 'decrement'); // Update localStorage
        }
    };

    const handleRemove = () => {
        onRemove(item.id);  // Remove logic passed from parent
        updateLocalStorageCart(item.id, 'remove'); // Update localStorage
    };

    // Helper function to update the cart in localStorage
    const updateLocalStorageCart = (itemId, action) => {
        let existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (action === 'remove') {
            // Remove the item
            existingCart = existingCart.filter(cartItem => cartItem.id !== itemId);
        } else if (action === 'increment') {
            // Find and increment the quantity
            existingCart = existingCart.map(cartItem =>
                cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
        } else if (action === 'decrement') {
            // Find and decrement the quantity
            existingCart = existingCart.map(cartItem =>
                cartItem.id === itemId && cartItem.quantity > 1
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(existingCart));
    };

    return (
        <div className="cart-item">
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
