import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import connectDb from "./config/db.js";

dotenv.config();
connectDb();

const importData = async () => {
  try {
    //1. delete every collection
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //create users
    const createdUsers = await User.insertMany(users);
    //get id of the admin user
    const adminUser = createdUsers[0]._id;
    //add admin user to products
    const sampleProducts = products.map((p) => {
      return {
        ...p,
        user: adminUser,
      };
    });
    //save in db
    await Product.insertMany(sampleProducts);
    console.log(`data imported`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error, import of data ${error.message}`.red.inverse);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    //1. delete every collection
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log(`data destroyed`.green.inverse);

    process.exit();
  } catch (error) {
    console.error(`Error, destroy of data ${error.message}`.red.inverse);
    process.exit(1);
  }
};

//passing arguments in bash
if(process.argv[2]==='-d'){
  destroyData()
}else{
  importData()
}