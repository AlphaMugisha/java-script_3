import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Import Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/user_routes.js';
import authRoutes from './routes/authRoutes.js';

// Configuration
dotenv.config(); // Load environment variables (Requirement A4)
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to Database (Requirement A1)
connectDB();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (Requirement A4)
app.use(express.json()); // Body parser for JSON data
app.use(express.urlencoded({ extended: true })); // Body parser for form data

// Static Folder for Images (Requirement A2)
// This allows the frontend to access images at http://localhost:PORT/uploads/filename
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes Mapping (Requirement A1)
app.use('/api/products', productRoutes); // Product CRUD endpoints
app.use('/api/users', userRoutes);       // User management endpoints
app.use('/api/auth', authRoutes);         // Login and Register endpoints

// Root Route (Optional check)
app.get('/', (req, res) => {
    res.send('Supermarket API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});