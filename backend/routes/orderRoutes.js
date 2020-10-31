import express from "express";
import { addOrder, getOrder,updateOrderToPaid } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, addOrder);
//after '/' 
router.get("/:id", protect, getOrder);
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
