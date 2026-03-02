const Product = require("../models/Product");
const fs = require("fs");

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter);
    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};


// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: "Error retrieving product" });
  }
};


// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price and category are required" });
    }

    const image = req.file ? req.file.filename : "";

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};


// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, description, price, category, stock } = req.body;

    if (req.file) {
      // delete old image if exists
      if (product.image) {
        fs.unlink(`uploads/${product.image}`, () => {});
      }
      product.image = req.file.filename;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};


// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      fs.unlink(`uploads/${product.image}`, () => {});
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};