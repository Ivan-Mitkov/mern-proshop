import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
//@desc Register new user
//@route POST /api/users
//@public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //find IF user in db
  const user = await User.findOne({ email });
  //if exists can't create send error
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }
  //password is still plain text
  const newUser = await User.create({ name, email, password });
  if (newUser) {
    //send back same data as with login
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
    //user not created
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
//@desc Auth user get token
//@route POST /api/users/login
//@public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find user in db
  const user = await User.findOne({ email });
  //if there is such user and password is correct
  if (user && (await user.matchPassword(password))) {
    // return that user
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});
//@desc GET user profile
//@route GET /api/users/profile
//@private
const getUserProfile = asyncHandler(async (req, res) => {
  //get id from req object where middleware save user
  //find this user in db
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

export { authUser, getUserProfile, createUser };
