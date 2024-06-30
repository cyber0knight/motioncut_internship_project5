import { db } from "../connect.js";

export const createOrder = (req, res) => {
    const { User_ID, Menu_ID, Price } = req.body;

    const q = "INSERT INTO orders(`User_ID`, `Menu_ID`, `Price`) VALUES (?)";

    const values = [
        User_ID,
        Menu_ID,
        Price
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Database error:", err); // Log the exact error
            return res.status(500).json({ error: 'Database error' });
        }

        return res.status(200).json({ message: 'Order created successfully', orderId: data.insertId });
    });
};

export const getOrderDetails = (req, res) => {
    const userId = req.params.id;
    const q = "SELECT * FROM orders where user_id = ?";
    db.query(q, userId, (err, data) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      return res.status(200).json(data);
    });
  };