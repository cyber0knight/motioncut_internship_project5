import express from 'express';
import { db } from "../connect.js"
import JWT from "jsonwebtoken"

export const addCartItem = (req, res) => {
    const {user_id,  menu_id, quantity, price } = req.body;
  
    if (!menu_id || !quantity || !price) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const q = 'INSERT INTO cart_items (User_ID, Menu_ID, Quantity, Price) VALUES (?, ?, ?, ?)';
    db.query(q, [user_id, menu_id, quantity, price], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Item added to cart successfully', result });
    });
  };
  
  export const emptyCart = (req, res) => {
    const user_id = req.params;
  
    const q = 'DELETE FROM cart_items WHERE User_ID = ?';
    db.query(q, [user_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json({ message: 'Cart emptied successfully', result });
    });
  };
  
  export const getCartItems = (req, res) => {
    const user_id = req.params;
  
    const q = 'SELECT * FROM cart_items WHERE User_ID = ?';
    db.query(q, [user_id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json(results);
    });
  };