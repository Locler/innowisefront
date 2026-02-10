import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

const API_URL = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

// ORDER ITEMS
export const getOrderItem= (id) =>
    API_URL.get(`/orderItems/${id}`, { headers: authHeader() });

export const getAllOrderItems = (params) =>
    API_URL.get(`/orderItems`, { params, headers: authHeader() });

export const createOrderItem = (dto) =>
    API_URL.post(`/orderItems`, dto, { headers: authHeader() });

export const updateOrderItem = (id, dto) =>
    API_URL.put(`/orderItems/${id}`, dto, { headers: authHeader() });

export const deleteOrderItem = (id) =>
    API_URL.delete(`/orderItems/${id}`, { headers: authHeader() });
