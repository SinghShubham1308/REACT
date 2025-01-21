import axios from 'axios';

// Create an Axios instance with base configuration
const ApiClient = axios.create({
    baseURL: 'http://localhost:9000/api', // Base URL for the backend API
});

// Add a request interceptor to include the Authorization header
ApiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach the token
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default ApiClient;
