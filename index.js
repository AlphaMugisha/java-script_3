import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import userRoutes from "./routes/user_routes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Server running on port ${port}`));