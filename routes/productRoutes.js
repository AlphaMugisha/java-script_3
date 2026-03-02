import express from "express";

const router = express.Router();

// Sample fake data
let products = [
  { id: 1, name: "Milk", category: "Dairy", price: 1000, stock: 10 },
  { id: 2, name: "Bread", category: "Bakery", price: 500, stock: 5 },
];

// GET all products
router.get("/", (req, res) => {
  const { category } = req.query;
  if (category) {
    const filtered = products.filter(p => p.category === category);
    return res.json(filtered);
  }
  res.json(products);
});

// GET single product
router.get("/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// POST create product
router.post("/", (req, res) => {
  const { name, category, price, stock = 0 } = req.body;
  if (!name || !category || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newProduct = { id: products.length + 1, name, category, price, stock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put("/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { name, category, price, stock } = req.body;
  if (name) product.name = name;
  if (category) product.category = category;
  if (price) product.price = price;
  if (stock !== undefined) product.stock = stock;

  res.json(product);
});

// DELETE product
router.delete("/:id", (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  products.splice(index, 1);
  res.json({ message: "Product deleted successfully" });
});

export default router;