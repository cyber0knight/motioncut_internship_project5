import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './cart.css';
import Header from "../components/header.js";
import makeRequest from '../axios.js';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log("Loaded from localStorage:", storedCartItems);
    setCartItems(storedCartItems);
  }, []);
  
  const updateLocalStorage = (updatedCartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const removeItemFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    updateLocalStorage([]);
  };

  const handleSubmit = async () => {
    try {
      const orderPromises = cartItems.map(item => {
        return makeRequest.post('/orders/create', {
          User_ID: userId,
          Menu_ID: item.id,
          Price: item.price
        });
      });

      await Promise.all(orderPromises);

      clearCart();
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <Header type="profile" />
      <div className="cart-container">
        <h1>Cart</h1>
        <table className="cart-items-table">
          <thead>
            <tr>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="cart-item">
                <td>₹{item.price}</td>
                <td>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </td>
                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeItemFromCart(item.id)} className="remove-button">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-price">
          <h2>Total: ₹{calculateTotalPrice().toFixed(2)}</h2>
        </div>
        <button onClick={handleSubmit} className="order-button">Order Now</button>
      </div>
    </div>
  );
}
