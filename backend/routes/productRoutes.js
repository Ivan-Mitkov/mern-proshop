import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

import {
  getProductById,
  getProducts,
  deleteProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
