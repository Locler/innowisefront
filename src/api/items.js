import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

const API_URL = '';

export const getItem = (id) =>
    axios.get(`${API_URL}/items/${id}`, { headers: authHeader() });

export const getAllItems = (params) =>
    axios.get(`${API_URL}/items`, { params, headers: authHeader() });

export const createItem = (dto) =>
    axios.post(`${API_URL}/items`, dto, { headers: authHeader() });

export const updateItem = (id, dto) =>
    axios.put(`${API_URL}/items/${id}`, dto, { headers: authHeader() });

export const deleteItem = (id) =>
    axios.delete(`${API_URL}/items/${id}`, { headers: authHeader() });
