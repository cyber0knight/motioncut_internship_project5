import express from 'express';
import {userLogin, userLogout, userRegister, providerRegister, providerLogin, providerLogout } from "../controllers/auth.js";

const router = express.Router();

router.post("/userRegister", userRegister);
router.post("/userLogin", userLogin);
router.post("/userLogout", userLogout);
router.post("/providerRegister", providerRegister);
router.post("/providerLogin", providerLogin);
router.post("/providerLogout", providerLogout);

export default router;