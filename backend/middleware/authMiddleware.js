import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//
const protect = asyncHandler(async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      //fetch user without password and save it in req
      req.user = await User.findById(decoded.id).select("-password");
      // console.log(req.user);
      next();
    } catch (error) {
      console.error("Error: ", error.message);
      res.status(401);
      throw new Error("Not authorised token error");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
