import axios from 'axios';
import { Laptop, SearchFilters, LaptopDetail } from '../types';

const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add error handling
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data ?? error.message);
        throw error;
    }
);

export const getLaptops = async (page = 1, limit = 10): Promise<Laptop[]> => {
    try {
        const response = await api.get(`/laptops/?skip=${(page-1)*limit}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch laptops:', error);
        return [];
    }
};

export const searchLaptops = async (filters: SearchFilters): Promise<Laptop[]> => {
    try {
        const response = await api.get('/laptops/search', { params: filters });
        return response.data;
    } catch (error) {
        console.error('Failed to search laptops:', error);
        return [];
    }
};

export const getLaptopDetails = async (id: number): Promise<LaptopDetail | null> => {
    try {
        const response = await api.get(`/laptops/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch laptop details:', error);
        return null;
    }
};

export const getRelatedLaptops = async (id: number): Promise<Laptop[]> => {
    try {
        const response = await api.get(`/laptops/${id}/related`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch related laptops:', error);
        return [];
    }
};