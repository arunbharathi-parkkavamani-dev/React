// src/api/axiosInstance.js
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // 👈 Required for session-based login
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
