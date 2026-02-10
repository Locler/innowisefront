import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

const API_URL = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

// POST /payments
export const createPayment = (dto) =>
    API_URL.post(`/payments`, dto, { headers: authHeader() });

// GET /payments/{id}
export const getPaymentById = (id) =>
    API_URL.get(`/payments/${id}`, { headers: authHeader() });

// GET /payments/byUser/{userId}
export const getPaymentsByUser = (userId) =>
    API_URL.get(`/payments/byUser/${userId}`, { headers: authHeader() });

// GET /payments/by-order/{orderId} — ADMIN only
export const getPaymentsByOrder = (orderId) =>
    API_URL.get(`/payments/by-order/${orderId}`, { headers: authHeader() });

// PUT /payments/{id}/status — ADMIN only
export const updatePaymentStatus = (id, status) =>
    API_URL.put(`/payments/${id}/status?status=${status}`, null, { headers: authHeader() });

// DELETE /payments/{id}
export const deletePayment = (id) =>
    API_URL.delete(`/payments/${id}`, { headers: authHeader() });
