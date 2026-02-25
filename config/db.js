import mongoose from "mongoose";
const connectDb = async () => {
    try {
    await mongoose.connect('mongodb://localhost:27017/Shop')
    }catch (err) {
        console.error("connection error", err);
        process.exit(1);
    }
}