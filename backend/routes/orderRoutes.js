import express from "express";
import {
  addOrder,
  getOrder,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, addOrder);
router.get("/", protect, isAdmin, getOrders);
//after '/' before /:
router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrder);
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
