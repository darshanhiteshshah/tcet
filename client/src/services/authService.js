import axios from "axios";

// Use the production URL from environment variables,
// but fall back to the relative path for local development.
const API_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const registerUser = (userData) => {
    return axios.post(`${API_URL}/users/register`, userData);
};

export const loginUser = (credentials) => {
    return axios.post(`${API_URL}/users/login`, credentials);
};