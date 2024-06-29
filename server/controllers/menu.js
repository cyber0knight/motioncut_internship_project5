import {db} from "../connect.js";
import jwt from "jsonwebtoken";
// import moment from "moment";

export const getMenu = (req, res) => {
    const q = "select * from menu"
    db.query(q, (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const addMenu = (req, res) => {
    const q = "insert into menu ?"
    const values = [req.body]
    db.query(q, values, (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(201).json("Menu has been created")
    })
}

export const getMenuItem = (req, res) => {
    const { id } = req.params; 
    const q = `
      SELECT m.*, r.id as review_id, r.User_ID, r.Rating, r.Comment, r.Review_Date
      FROM menu as m 
      LEFT JOIN reviews as r ON m.id = r.Menu_ID
      WHERE m.id = ?;
    `;
    
    db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json('Item not found');
      
      // Structure the response to have item details and reviews
      const item = {
        itemId: data[0].ID,
        name: data[0].Name,
        image: data[0].Image,
        description: data[0].Description,
        price: data[0].Price,
        reviews: data.filter(review => review.id !== null).map(review => ({
          review_id: review.id,
          user_id: review.User_ID,
          rating: review.Rating,
          comment: review.Comment,
          review_date: review.Review_Date
        }))
      };
      
      return res.status(200).json(item);
    });
  }
  