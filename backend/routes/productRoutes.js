import express from "express";

import {
  getProductById,
  getProducts,
} from "../controllers/productControllers.js";


const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);
export default router;
