// swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

export const swaggerUi = swaggerUiExpress;

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shop API",
      version: "1.0.0",
      description: "API for Users, Products, and Auth",
    },
    servers: [
      { url: "http://localhost:5000" }
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            username: { type: "string" },
            email: { type: "string" },
            password: { type: "string" }
          },
          required: ["username", "email", "password"]
        },
        Product: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            price: { type: "number" },
            description: { type: "string" }
          },
          required: ["name", "price"]
        }
      }
    }
  },
  apis: ["./routes/*.js"], // <- your route files with JSDoc comments
});