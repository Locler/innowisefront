import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

const API_URL = '';


export const getOrderById = (id) =>
    axios.get(`${API_URL}/orders/${id}`, { headers: authHeader() });

export const getAllOrders = (params) =>
    axios.get(`${API_URL}/orders`, { params, headers: authHeader() });

export const createOrder = (dto) =>
    axios.post(`${API_URL}/orders`, dto, { headers: authHeader() });

export const updateOrder = (id, dto) =>
    axios.put(`${API_URL}/orders/${id}`, dto, { headers: authHeader() });

export const updateOrderStatus = (id, status) =>
    axios.put(`${API_URL}/orders/${id}/status`, { status }, { headers: authHeader() });

export const deleteOrder = (id) =>
    axios.delete(`${API_URL}/orders/${id}`, { headers: authHeader() });
