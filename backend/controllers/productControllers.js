import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc fetch all products
//@route GET /api/products
//@public
const getProducts = asyncHandler(async (req, res) => {
  /**Pagination */
  //how many products per page
  const pageSize = 3;
  //which page number we are
  const page = Number(req.query.pageNumber) || 1;

  /*SEARCH QUERY*/
  //see if there is search
  let keyword = "";
  if (req.query.keyword) {
    keyword = {
      name: {
        //name contains searchterm
        $regex: req.query.keyword,
        //case insensitive
        $options: "i",
      },
    };
  } else {
    keyword = {};
  }
  /**Search end */
  //Pagnation again
  //how many products in the result
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // send products with limit and skip, on which page we are, and how many pages there are
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
//@desc create new review
//@route POST /api/products/:id/reviews
//@private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  //find product we are reviewing
  const product = await Product.findById(req.params.id);
  if (product) {
    //check if user has already submitted a review
    //compare user in product schema reviews with logged in user
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    //if no review from this user
    //construct review object
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    //add review to the product reviews array
    product.reviews.push(review);
    //update number of reviews
    product.numReviews = product.reviews.length;
    //update overall rating
    product.rating = +(
      product.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
      product.reviews.length
    ).toFixed(2);
    //save product
    await product.save();
    res.status(201).json({ message: "Review added" });
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
  createReview,
};
