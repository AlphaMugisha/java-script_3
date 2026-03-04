import express from "express";
import { registerUser, loginUser, createUser } from "../controllers/user_controllers.js";

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Admin/general create user
router.post("/", createUser);

export default router;