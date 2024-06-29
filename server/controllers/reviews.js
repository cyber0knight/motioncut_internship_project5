import express from 'express';
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const addReview = (req, res) => {
    const {User_ID, Menu_ID, Rating, Comment } = req.body;
    const q = "INSERT INTO reviews (user_ID, Menu_ID, Rating, Comment) VALUES (?, ?, ?, ?)";
    const values = [User_ID, Menu_ID, Rating, Comment];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json("Review has been added");
    });
}