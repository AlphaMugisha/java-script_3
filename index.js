import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/user_routes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// --- ROUTES ---
app.use("/api/auth", authRoutes);       // <--- important
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));