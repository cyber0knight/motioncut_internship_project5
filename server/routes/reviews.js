import express from "express";
import { addReview } from "../controllers/reviews.js";

const router = express.Router();

router.post("/post", addReview);
// router.post("/", addMenu);
// router.delete("/:id", deleteMenu);

export default router;