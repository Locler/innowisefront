import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

const API_URL = '';

// POST /payments
export const createPayment = (dto) =>
    axios.post(`${API_URL}/payments`, dto, { headers: authHeader() });

// GET /payments/{id}
export const getPaymentById = (id) =>
    axios.get(`${API_URL}/payments/${id}`, { headers: authHeader() });

// GET /payments/byUser/{userId}
export const getPaymentsByUser = (userId) =>
    axios.get(`${API_URL}/payments/byUser/${userId}`, { headers: authHeader() });

// GET /payments/by-order/{orderId} — ADMIN only
export const getPaymentsByOrder = (orderId) =>
    axios.get(`${API_URL}/payments/by-order/${orderId}`, { headers: authHeader() });

// PUT /payments/{id}/status — ADMIN only
export const updatePaymentStatus = (id, status) =>
    axios.put(`${API_URL}/payments/${id}/status?status=${status}`, null, { headers: authHeader() });

// DELETE /payments/{id}
export const deletePayment = (id) =>
    axios.delete(`${API_URL}/payments/${id}`, { headers: authHeader() });
