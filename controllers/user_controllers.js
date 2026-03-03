import User from "../models/user.js";

// @desc Create/Register a new user
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Hide passwords for safety
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};