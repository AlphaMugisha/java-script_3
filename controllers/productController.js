import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

// @desc Get all products (Requirement A3)
// Supports optional category filter: /api/products?category=Dairy
export const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Fetching products...", error.message);
    }
};

// @desc Get single product by ID (Requirement A3)
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Create a product (Requirement A3)
// Handles multipart/form-data for image upload via multer
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const image = req.file ? req.file.filename : "";

        // Validation: Required fields (Requirement A4)
        if (!name || !price || !category) {
            return res.status(400).json({ message: "Name, price, and category are required" });
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Update product (Requirement A3)
export const updateProduct = async (req, res) => {
    try {
        const updateData = { ...req.body };
        
        // If a new image is uploaded, update the image field
        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Delete product & cleanup image (Requirement A3)
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Requirement A3: Delete the image file from /uploads if it exists
        if (product.image) {
            const imagePath = path.join("uploads", product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product and associated image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};