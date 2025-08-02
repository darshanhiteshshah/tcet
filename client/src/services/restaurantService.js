// FILE: client/src/services/restaurantService.js
// NEW: This service handles all API calls related to restaurants.

import axios from 'axios';

const API_URL = '/api/restaurants';

// Fetches all restaurants from the backend
export const getAllRestaurants = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Fetches a single restaurant by its ID from the backend
export const getRestaurantById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};