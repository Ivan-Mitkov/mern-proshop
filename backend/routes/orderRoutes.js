import express from "express";
import {
  addOrder,
  getOrder,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, addOrder);
router.get("/", protect, isAdmin, getOrders);
//after '/' before /:
router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrder);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/delivered", protect, isAdmin, updateOrderToDelivered);

export default router;
