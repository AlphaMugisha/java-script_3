import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true, collection: 'users' }); // <-- point to the users collection

const User = mongoose.model("User", userSchema);

export default User;