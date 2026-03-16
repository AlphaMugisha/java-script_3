import express from "express";
import { getUsers, createUser } from "../controllers/user_controllers.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: CRUD operations for users
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", getUsers);

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a user (admin)
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/create", createUser);

export default router;