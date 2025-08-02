// FILE: client/src/services/orderService.js
// This service handles all API calls related to orders.

import axios from 'axios';

// ---
// CHANGE FOR RENDER DEPLOYMENT:
// Use an environment variable for the API base URL and correctly append the path.
// The backend uses a '/api' prefix, so we must include it here.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_URL = `${API_BASE_URL}/api/orders`;

// Creates a new order
export const createOrder = async (orderData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const { data } = await axios.post(API_URL, orderData, config);
    return data;
};

// Fetches the details of a specific order by its ID
export const getOrderDetails = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const { data } = await axios.get(`${API_URL}/${id}`, config);
    return data;
};
