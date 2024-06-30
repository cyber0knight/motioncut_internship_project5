import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './cart.css';
import Header from "../components/header.js";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  // Load cart items from localStorage on initial render
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log("Loaded from localStorage:", storedCartItems); // Debug log
    setCartItems(storedCartItems);
  }, []);
  
  // Function to update localStorage whenever cartItems changes
  const updateLocalStorage = (updatedCartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems); // Update localStorage after increasing quantity
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems); // Update localStorage after decreasing quantity
  };

  const removeItemFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems); // Update localStorage after removing item
  };

  const clearCart = () => {
    setCartItems([]);
    updateLocalStorage([]); // Update localStorage after clearing cart
  };

  const handleSubmit = () => {
    clearCart();
    alert('Order placed successfully!');
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <Header type="logout" />
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
