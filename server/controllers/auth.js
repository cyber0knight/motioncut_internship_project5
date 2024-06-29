import { db } from "../connect.js"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

export const userRegister = (req, res) => {

    const q = "SELECT * FROM users WHERE email = ?"

    db.query(q, [req.body.email], (err, data) => {
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("user already exists!") 
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (email, password) VALUES (?, ?)";

        const value = [req.body.email, hashedPassword];

        db.query(q,value, (err, data) => {
            if(err) return res.status(500).json(err)
            return res.status(201).json("User has been created")
        })
    })
}



export const userLogin = (req, res) => {
    const q = "SELECT * FROM users WHERE email =?"

    db.query(q, [req.body.email], (err, data) => {
        if(err) return res.status(500).json(err)
        if(!data.length) return res.status(404).json("User not found!")
        
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].Password);
        if(!checkPassword) return res.status(404).json("wrong password!");

        const token = JWT.sign({id: data[0].User_ID}, "secretkey");
        const {Password, ...others} = data[0];

        res.cookie("accessToken", token, {httpOnly: true})
        .status(200).json(others);
    })
}

export const userLogout = (req, res) =>{
    res.clearCookie("accessToken", {
        secure:true,
        sameSite:"none"
    }).status(200).json("Use has been logged out")
}

export const providerRegister = (req, res) => {
    const q = "SELECT * FROM providers WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("Supplier already exists!")
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO providers (email, password) VALUES (?, ?)";

        const values = [req.body.email, hashedPassword]

        db.query(q, values, (err, data) => {
            if(err) return res.status(500).json(err)
            return res.status(201).json("Supplier has been created")
        })
    })
}

export const providerLogin = (req, res) => {

    const q = "SELECT * FROM providers WHERE email =?"
    db.query(q, [req.body.email], (err, data) => {
        if(err) return res.status(500).json(err)
        if(!data.length) return res.status(404).json("User not found!")
        
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].Password);
        if(!checkPassword) return res.status(404).json("wrong password!");

        const token = JWT.sign({id: data[0].User_ID}, "secretkey");
        const {Password, ...others} = data[0];

        res.cookie("accessToken", token, {httpOnly: true})
        .status(200).json(others);
    })
}
export const providerLogout = (req, res) => {
    res.clearCookie("accessToken", {
        secure:true,
        sameSite:"none"
    }).status(200).json("Use has been logged out")
}