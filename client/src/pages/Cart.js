import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './cart.css';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    if (location.state) {
      const { id, quantity, price } = location.state;
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(item => item.id === id);
        if (existingItem) {
          return prevItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prevItems, { id, quantity, price }];
      });
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleSubmit = () => {
    clearCart();
    alert('Order placed successfully!');
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <span>Menu ID: {item.id}</span>
            <span>Price: ${item.price}</span>
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <button onClick={() => removeItemFromCart(item.id)} className="remove-button">Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} className="order-button">Order Now</button>
    </div>
  );
}
