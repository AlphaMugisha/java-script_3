import express from "express";
import { getProducts, createProduct } from "../controllers/productController.js";

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Returns a list of products
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a product
 *     description: Add a new product to the database
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/", createProduct);

export default router;