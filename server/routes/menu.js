import express from "express";
import { getMenu, getMenuItem } from "../controllers/menu.js";

const router = express.Router();

router.get("/", getMenu);
router.get("/:id", getMenuItem);
// router.post("/", addMenu);
// router.delete("/:id", deleteMenu);

export default router;