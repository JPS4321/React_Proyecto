import React from 'react';
import './CartItem.css';

function CartItem({ item, onIncrement, onDecrement, onRemove }) {
    return (
        <div className="cart-item">
            <div className="cart-item-details">
                <h2 className="cart-item-name">{item.name} (Size: {item.size})</h2>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <div className="cart-item-quantity">
                    <button className="quantity-button" onClick={() => onDecrement(item.id)}>-</button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button className="quantity-button" onClick={() => onIncrement(item.id)}>+</button>
                </div>
            </div>
            <button className="remove-button" onClick={() => onRemove(item.id)}>Remove</button>
        </div>
    );
}


export default CartItem;