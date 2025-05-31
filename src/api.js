import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://verceldemo-ppzn.onrender.com/api',
    
});
// https://verceldemo-ppzn.onrender.com/api

export const get = async (endpoint) => {
    try {
        const response = await instance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const post = async (endpoint, body) => {
    try {
        const response = await instance.post(endpoint, body);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const remove = async (endpoint) => {
    try {
        const response = await instance.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const put = async (endpoint, body) => {
    try {
        const response = await instance.put(endpoint, body);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};