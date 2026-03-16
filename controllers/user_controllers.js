import User from "../models/user.js";

// GET ALL USERS
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// GET ONE USER
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

// CREATE USER
export const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

// UPDATE USER
export const updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(updated);
};

// DELETE USER
export const deleteUser = async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted successfully" });
};