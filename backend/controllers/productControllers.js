import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc fetch all products
//@route GET /api/products
//@public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // console.log('server products',products)
  res.json(products);
});
//@desc fetch product
//@route GET /api/products:id
//@publi
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  //throw error wich is handled by custom error handler
  throw new Error("Product not found");
});

export {getProducts,getProductById}
