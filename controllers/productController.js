import Product from "../models/Product.js";

// GET all products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// CREATE product
export const createProduct = async (req, res) => {
  const { name, price } = req.body;

  const product = new Product({
    name,
    price,
  });

  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
};

// DELETE product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deleted = await Product.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product deleted successfully" });
};