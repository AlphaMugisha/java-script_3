import Product from "../models/Product.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// GET ONE PRODUCT
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  const { name, price, stock, category, description } = req.body;

  const product = new Product({
    name,
    price,
    stock,
    category,
    description,
  });

  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(updated);
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product deleted successfully" });
};