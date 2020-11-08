import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/top", getTopProducts);

router.get("/:id", getProductById);
router.post("/", protect, isAdmin, createProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.post("/:id/reviews", protect, createReview);

export default router;
