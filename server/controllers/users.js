import express from 'express';
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUserDetails = (req, res) => {
    const userId = req.params.id;

    const q = "SELECT id, Email, Name, Phone, pincode, Address, created_At FROM users WHERE id = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (!data.length) return res.status(404).json("User not found!");

        return res.status(200).json(data[0]);
    });
}


export const editUserDetails = (req, res) => {
    const userId = req.params.id;

    const q = "UPDATE users SET Name = ?, Phone = ?, pincode = ?, Address = ? WHERE id = ?";

    const values = [
        req.body.name,
        req.body.phone,
        req.body.pincode,
        req.body.address,
        userId
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0) return res.status(404).json("User not found!");

        return res.status(200).json("User details updated successfully");
    });
}
