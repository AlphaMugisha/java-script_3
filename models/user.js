import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },   // ← use name
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);