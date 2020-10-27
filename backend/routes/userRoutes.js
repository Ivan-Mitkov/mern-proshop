import express from "express";
import { authUser,getUserProfile,createUser } from "../controllers/userControllers.js";
import {protect} from '../middleware/authMiddleware.js'
const router = express.Router();

router.post("/", createUser);
router.post("/login", authUser);
router.get("/profile",protect, getUserProfile);

export default router;
