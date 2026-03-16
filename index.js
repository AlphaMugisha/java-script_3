import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/user_routes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shop API",
      version: "1.0.0",
      description: "API documentation for the shop project",
    },
    servers: [
      { url: "http://localhost:5000" },
    ],
  },
  apis: ["./routes/*.js"], // look into all route files
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
  console.log("Swagger docs: http://localhost:5000/api-docs");
});