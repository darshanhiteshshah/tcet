// FILE: client/src/services/authService.js
// This service handles all API calls related to user authentication.

import axios from 'axios';

// ---
// CHANGE FOR RENDER DEPLOYMENT:
// Use an environment variable for the API base URL and correctly append the path.
// The backend uses a '/api' prefix, so we must include it here.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_URL = `${API_BASE_URL}/api/users`;

// Register user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error("Error during user registration:", error.response?.data?.message || error.message);
        throw error;
    }
};

// Login user
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error("Error during user login:", error.response?.data?.message || error.message);
        throw error;
    }
};

// Logout user
export const logout = () => {
    localStorage.removeItem('user');
};

// Get current user from local storage
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
