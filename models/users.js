import mongoose from "mongoose";
const userschema = new mongoose.Schema ({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
}, {timestamps: true});
export default mongoose.model("User", userschema, "users");