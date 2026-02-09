import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

const API_URL = '';

// ORDER ITEMS
export const getOrderItem= (id) =>
    axios.get(`${API_URL}/orderItems/${id}`, { headers: authHeader() });

export const getAllOrderItems = (params) =>
    axios.get(`${API_URL}/orderItems`, { params, headers: authHeader() });

export const createOrderItem = (dto) =>
    axios.post(`${API_URL}/orderItems`, dto, { headers: authHeader() });

export const updateOrderItem = (id, dto) =>
    axios.put(`${API_URL}/orderItems/${id}`, dto, { headers: authHeader() });

export const deleteOrderItem = (id) =>
    axios.delete(`${API_URL}/orderItems/${id}`, { headers: authHeader() });
