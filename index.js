import express from "express";
import connectDB from "./config/db.js";

connectDB();

const app = express();
const port = 5000;

app.use(express.json());

/* ======================
   USERS (IN MEMORY)
====================== */
let users = [];

/* ======================
   REGISTER
====================== */
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password
  };

  users.push(newUser);

  res.status(201).json({
    message: "User registered successfully",
    user: { id: newUser.id, name, email }
  });
});

/* ======================
   LOGIN
====================== */
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email }
  });
});

/* ======================
   PRODUCTS (IN MEMORY)
====================== */
let products = [
  { id: 1, name: "Milk", category: "Dairy", price: 1000, stock: 10 },
  { id: 2, name: "Bread", category: "Bakery", price: 500, stock: 5 }
];

// GET ALL PRODUCTS
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET ONE PRODUCT
app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// CREATE PRODUCT
app.post("/api/products", (req, res) => {
  const { name, category, price, stock = 0 } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    category,
    price,
    stock
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// UPDATE PRODUCT
app.put("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, category, price, stock } = req.body;

  if (name) product.name = name;
  if (category) product.category = category;
  if (price) product.price = price;
  if (stock !== undefined) product.stock = stock;

  res.json(product);
});

// DELETE PRODUCT
app.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(index, 1);

  res.json({ message: "Product deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});