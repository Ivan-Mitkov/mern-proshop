import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const router = express.Router();
//@desc fetch all products
//@route GET /api/products
//@public

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
//@desc fetch product
//@route GET /api/products:id
//@publi
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    }
    return res.status(404).json({ msg: "product not found" });
  })
);
export default router;
