import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

// ORDER ITEMS
export const getOrderItem= (id) =>
    axios.get(`/orderItems/${id}`, { headers: authHeader() });

export const getAllOrderItems = (params) =>
    axios.get('/orderItems', { params, headers: authHeader() });

export const createOrderItem = (dto) =>
    axios.post('/orderItems', dto, { headers: authHeader() });

export const updateOrderItem = (id, dto) =>
    axios.put(`/orderItems/${id}`, dto, { headers: authHeader() });

export const deleteOrderItem = (id) =>
    axios.delete(`/orderItems/${id}`, { headers: authHeader() });
