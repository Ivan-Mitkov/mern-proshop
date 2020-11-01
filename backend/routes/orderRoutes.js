import express from "express";
import {
  addOrder,
  getOrder,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, addOrder);
//after '/' before /:
router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrder);
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
