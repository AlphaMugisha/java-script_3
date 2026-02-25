import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user_routes.js";

const app = express();

app.use(express.json());

// ROUTES
app.use("/api", userRoutes);

// DB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/shopDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});