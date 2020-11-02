import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
//@desc Register new user
//@route POST /api/users
//@public
const createUser = asyncHandler(async (req, res) => {
  //get user data from frontend
  const { name, email, password } = req.body;
  //find IF user in db
  const user = await User.findOne({ email });
  //if exists can't create send error
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }
  //password is still plain text
  //encrypt password in User Model
  const newUser = await User.create({ name, email, password });
  //if new user is created in DB
  if (newUser) {
    //send back same data as with login
    //generate token
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
  //get login data from front end
  const { email, password } = req.body;
  //find user in db
  const user = await User.findOne({ email });
  //if there is such user and password is correct
  if (user && (await user.matchPassword(password))) {
    // return that user
    //generate token
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
  //user is logeed in so there is token
  //find this user in db
  const user = await User.findById(req.user._id);
  // console.log("get user profile", user);
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
//@desc UPDATE user profile
//@route PUT /api/users/profile
//@private
const updateUserProfile = asyncHandler(async (req, res) => {
  //get id from req object where middleware save user
  //user is logeed in so there is token
  //find this user in db
  const user = await User.findById(req.user._id);
  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);
    if (req.body.password) {
      //encrypted in model
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
//ADMIN ROUTES
//@desc GET users 
//@route GET /api/users
//@private/admin
const getAllUsers = asyncHandler(async (req, res) => {
  
  const users = await User.find({});
  res.json(users)
});


export { authUser, getUserProfile, createUser, updateUserProfile,getAllUsers };
