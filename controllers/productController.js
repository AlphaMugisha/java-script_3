import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ messagea: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    console.log("Incoming product:", req.body); // DEBUG

    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};