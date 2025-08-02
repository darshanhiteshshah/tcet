// FILE: src/services/orderService.js
// NEW: This service handles all API calls related to orders.

import axios from 'axios';

const API_URL = '/api/orders';

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