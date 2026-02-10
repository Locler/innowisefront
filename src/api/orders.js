import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

const API_URL = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});


export const getOrderById = (id) =>
    API_URL.get(`/orders/${id}`, { headers: authHeader() });

export const getAllOrders = (params) =>
    API_URL.get(`/orders`, { params, headers: authHeader() });

export const createOrder = (dto) =>
    API_URL.post(`/orders`, dto, { headers: authHeader() });

export const updateOrder = (id, dto) =>
    API_URL.put(`/orders/${id}`, dto, { headers: authHeader() });

export const updateOrderStatus = (id, status) =>
    API_URL.put(`/orders/${id}/status`, { status }, { headers: authHeader() });

export const deleteOrder = (id) =>
    API_URL.delete(`/orders/${id}`, { headers: authHeader() });
