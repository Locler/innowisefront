import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

export const getItem = (id) =>
    axios.get(`/items/${id}`, { headers: authHeader() });

export const getAllItems = (params) =>
    axios.get('/items', { params, headers: authHeader() });

export const createItem = (dto) =>
    axios.post('/items', dto, { headers: authHeader() });

export const updateItem = (id, dto) =>
    axios.put(`/items/${id}`, dto, { headers: authHeader() });

export const deleteItem = (id) =>
    axios.delete(`/items/${id}`, { headers: authHeader() });
