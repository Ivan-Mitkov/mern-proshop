import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, isAdmin, createProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);
router.put("/:id", protect, isAdmin, updateProduct);

export default router;
