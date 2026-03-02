// controllers/productController.js
import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE product
export const createProduct = async (req, res) => {
  try {
    const { name, description = "", price, category, stock = 0 } = req.body;
    if (!name || !price || !category)
      return res.status(400).json({ message: "Missing required fields" });

    const image = req.file ? req.file.filename : "";
    const product = await Product.create({ name, description, price, category, stock, image });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, description, price, category, stock } = req.body;
    if (req.file) {
      // remove old image if exists
      if (product.image) fs.unlinkSync(path.join("uploads", product.image));
      product.image = req.file.filename;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.image) fs.unlinkSync(path.join("uploads", product.image));
    await product.remove();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};