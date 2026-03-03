// server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; // make sure path is correct

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));