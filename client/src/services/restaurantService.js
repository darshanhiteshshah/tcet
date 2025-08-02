// FILE: client/src/services/restaurantService.js
// This service handles all API calls related to restaurants.

import axios from 'axios';

// ---
// CHANGE FOR RENDER DEPLOYMENT:
// Use an environment variable for the API base URL and correctly append the path.
// The backend uses a '/api' prefix, so we must include it here.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_URL = `${API_BASE_URL}/api/restaurants`;

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
