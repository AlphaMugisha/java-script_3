import user from "../models/users.js";
export const getallusers = async(req, res) => {
    try {
    const users = await user.find();
    res.status(200).json(users);
    }catch (err) {
        res.status(500).json({message: "server error", error: err.message});
    }
}