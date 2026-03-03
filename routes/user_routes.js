import express from "express";
import { createUser, getUsers } from "../controllers/user_controllers.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);

export default router;