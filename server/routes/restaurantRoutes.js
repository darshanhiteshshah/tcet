import express from 'express';
import { getRestaurants, getRestaurantById } from '../controllers/restaurantController.js';

const router = express.Router();

// Route to get all restaurants
router.route('/').get(getRestaurants);

// Route to get a single restaurant by its custom ID
router.route('/:id').get(getRestaurantById);

export default router;