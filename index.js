import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/user_routes.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// HTML pages
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile(process.cwd() + "/public/register.html");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
      console.log("Swagger docs: http://localhost:5000/api-docs");
    });
  })
  .catch((err) => console.log(err));