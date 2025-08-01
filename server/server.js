import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import authRoutes from './routes/authRoutes.js'; // NEW

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', authRoutes); // NEW

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));