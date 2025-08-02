// FILE: server.js
// A robust, production-ready Express server for your food app.

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables from the .env file.
// This is essential for local development. Render will handle these variables
// automatically in the production environment.
dotenv.config();

// Connect to the database.
connectDB();

const app = express();

// --- Middleware Configuration ---

// 1. CORS (Cross-Origin Resource Sharing) Middleware
// This is a crucial security feature that allows your frontend domain
// to make API calls to this backend.
// We use the CLIENT_ORIGIN environment variable to restrict access
// to your deployed frontend URL. For local dev, this will be http://localhost:3000.
// A wildcard '*' is not recommended for production.
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true, // Allow cookies and authentication headers
};
app.use(cors(corsOptions));

// 2. Body Parser Middleware
// These allow the server to parse JSON and URL-encoded data from incoming requests.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Define API Routes
// All routes are prefixed with '/api' to clearly separate them from
// any potential frontend static files.
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', authRoutes);
app.use('/api/orders', orderRoutes);

// --- Routes and Error Handling ---

// A simple root route to check if the server is running.
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Fallback for 404 Not Found errors.
// This middleware will be hit if no other route handles the incoming request.
app.use((req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});

// General error handling middleware.
// This will catch any errors thrown by your routes or other middleware.
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the full error stack in the console for debugging
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    // In production, we don't expose the stack trace to the client for security.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start the server and listen for incoming requests.
// It listens on the port defined by the environment variable, or defaults to 5000
// for local development.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
