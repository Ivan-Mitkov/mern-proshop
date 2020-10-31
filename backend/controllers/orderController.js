import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//@desc Create new order
//@route POST /api/orders
//@private
const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No items in order");
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
//@desc Get order by ID
//@route Get /api/orders/:id
//@private
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user','name email');

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  } 
    return res.json(order);
  
});

export { addOrder,getOrder };
