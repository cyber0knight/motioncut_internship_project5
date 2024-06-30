import React, { useState, useEffect } from 'react';
import makeRequest from '../axios.js';
import './cart.css';
import Header from "../components/header.js";

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [completedOrders, setCompletedOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const userId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await makeRequest.get(`/users/getUser/${userId}`);
        setUserDetails(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchCompletedOrders = async () => {
      try {
        const response = await makeRequest.get(`/orders/getOrders/${userId}`); // Update endpoint to match backend
        console.log('Response from API:', response.data);
        setCompletedOrders(response.data);
      } catch (error) {
        console.error('Error fetching completed orders:', error);
      }
    };

    fetchUserDetails();
    fetchCompletedOrders();
  }, [userId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await makeRequest.put(`/users/editUser/${userId}`, formData);
      setUserDetails(formData);
      setEditMode(false);
      alert('User details updated successfully!');
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update user details. Please try again.');
    }
  };

  return (
    <div>
      <Header type="logout" />
      <div className="profile-container">
        <h1>User Profile</h1>
        {editMode ? (
          <div className="user-details">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="Pincode"
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
            ></textarea>
            <button onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          <div className="user-details">
            <p><strong>Name:</strong> {userDetails.Name}</p>
            <p><strong>Email:</strong> {userDetails.Email}</p>
            <p><strong>Phone:</strong> {userDetails.Phone}</p>
            <p><strong>Pincode:</strong> {userDetails.pincode}</p>
            <p><strong>Address:</strong> {userDetails.Address}</p>
            <button onClick={handleEditClick}>Edit</button>
          </div>
        )}
        <h2>Completed Orders</h2>
        {completedOrders.length > 0 ? (
          <ul className="orders-list">
            {completedOrders.map(order => (
              <li key={order.id}>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Menu ID:</strong> {order.Menu_ID}</p>
                <p><strong>Price:</strong> ₹{order.Price}</p>
                <p><strong>Order Date:</strong> {new Date(order.Order_Date).toLocaleString()}</p>
                <p><strong>Delivery Date:</strong> {order.Delivery_Date ? new Date(order.Delivery_Date).toLocaleString() : 'Pending'}</p>
                <p><strong>Status:</strong> {order.Status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No completed orders yet.</p>
        )}
      </div>
    </div>
  );
}
