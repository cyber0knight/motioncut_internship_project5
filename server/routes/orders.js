import express from 'express';
import { createOrder, getOrderDetails } from '../controllers/orders.js';

const router = express.Router();

router.post("/create", createOrder);
router.get("/getOrders/:id", getOrderDetails);

export default router;