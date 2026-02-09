import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});


export const getOrderById = (id) =>
    axios.get(`/orders/${id}`, { headers: authHeader() });

export const getAllOrders = (params) =>
    axios.get('/orders', { params, headers: authHeader() });

export const createOrder = (dto) =>
    axios.post('/orders', dto, { headers: authHeader() });

export const updateOrder = (id, dto) =>
    axios.put(`/orders/${id}`, dto, { headers: authHeader() });

export const updateOrderStatus = (id, status) =>
    axios.put(`/orders/${id}/status`, { status }, { headers: authHeader() });

export const deleteOrder = (id) =>
    axios.delete(`/orders/${id}`, { headers: authHeader() });
