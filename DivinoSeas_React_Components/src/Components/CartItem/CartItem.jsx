import React from 'react';
import './CartItem.css';

function CartItem({ item }) {
    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h2 className="cart-item-name">{item.name}</h2>
                <p className="cart-item-price">${item.price}</p>
                <div className="cart-item-quantity">
                    <button className="quantity-button">-</button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button className="quantity-button">+</button>
                </div>
            </div>
            <button className="remove-button">Remove</button>
        </div>
    );
}

export default CartItem;
