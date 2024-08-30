import express from "express";
import {
  register,
  login,
  signup,
  getUser,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/register", register);
router.post("/login", login);
router.get("/", authMiddleware, getUser);

export default router;
