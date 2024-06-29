import express from 'express';
import { addCartItem, emptyCart, getCartItems } from '../controllers/cart_item.js';

const router = express.Router();

router.post('/addCartItem', addCartItem);
router.delete('/emptyCart/:id', emptyCart);
router.get('/cartItems/:id', getCartItems);

export default router;