import express from "express";

const app = express();
const port = 5000;

app.use(express.json());

// In-memory users
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});