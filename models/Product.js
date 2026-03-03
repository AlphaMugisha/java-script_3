import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }, //
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 }, //
    category: { type: String, required: true }, //
    stock: { type: Number, default: 0 },
    image: { type: String, default: '' } // stores filename from multer
}, { timestamps: true });

// This is the part that fixes "is not a function"
const Product = mongoose.model('Product', productSchema);
export default Product;