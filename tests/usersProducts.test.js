import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import User from "../models/user.js";
import Product from "../models/Product.js";

describe("Users and Products API", () => {
  beforeAll(async () => {
    // Connect to a test DB
    await mongoose.connect("mongodb://127.0.0.1:27017/shop_test");
  });

  beforeEach(async () => {
    // Clear collections before each test
    await User.deleteMany({});
    await Product.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // --- USERS TESTS ---
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        username: "Tiger",
        email: "tiger@example.com",
        password: "123456"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe("Tiger");
    expect(res.body).toHaveProperty("_id");
  });

  it("should get all users", async () => {
    await User.create({ username: "Alpha", email: "alpha@example.com", password: "abc123" });

    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].username).toBe("Alpha");
  });

  // --- PRODUCTS TESTS ---
  it("should create a new product", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({
        name: "Drone",
        price: 1000,
        description: "Test drone"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Drone");
    expect(res.body).toHaveProperty("_id");
  });

  it("should get all products", async () => {
    await Product.create({ name: "Camera", price: 500, description: "Test camera" });

    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Camera");
  });
});