// app.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/usersRoutes.js";
import productRoutes from "./routes/productsRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

export default app;