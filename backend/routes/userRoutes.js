import express from "express";
import {
  authUser,
  getUserProfile,
  createUser,
  updateUserProfile,
  getAllUsers
} from "../controllers/userControllers.js";
import { protect,isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", createUser);
router.get("/",protect,isAdmin, getAllUsers);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
