import express from 'express';
import { getUserDetails, editUserDetails } from '../controllers/users.js';

const router = express.Router();

router.get("/getUser/:id", getUserDetails);
router.put("/editUser/:id", editUserDetails);

export default router;