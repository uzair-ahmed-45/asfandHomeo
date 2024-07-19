// api.js

import axios from 'axios';

// Create an instance of axios with your base URL
const instance = axios.create({
    baseURL: 'https://verceldemo-ppzn.onrender.com/api',
    // You can also add headers or other configurations here if needed
});

// Function to handle GET requests
export const get = async (endpoint) => {
    try {
        const response = await instance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Function to handle POST requests
export const post = async (endpoint, body) => {
    try {
        const response = await instance.post(endpoint, body);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Function to handle DELETE requests
export const remove = async (endpoint) => {
    try {
        const response = await instance.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Function to handle PUT requests
export const put = async (endpoint, body) => {
    try {
        const response = await instance.put(endpoint, body);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};