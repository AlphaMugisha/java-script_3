import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use("/api/products", productRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));