import express from "express";
import { addOrder, getOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, addOrder);
//after '/' 
router.get("/:id", protect, getOrder);

export default router;
