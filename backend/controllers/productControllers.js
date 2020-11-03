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
//@desc delete a product
//@route DELETE /api/products:id
//@private/admin
//every admin can delete any product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    return res.json({ message: "Product removed" });
  }
  res.status(404);
  //throw error wich is handled by custom error handler
  throw new Error("Product not found");
});
//@desc create a product
//@route POST /api/products
//@private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
//@desc update a product
//@route PUT /api/products/:id
//@private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
