import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

const API_URL = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});


export const getItem = (id) =>
    API_URL.get(`/items/${id}`, { headers: authHeader() });

export const getAllItems = (params) =>
    API_URL.get(`/items`, { params, headers: authHeader() });

export const createItem = (dto) =>
    API_URL.post(`/items`, dto, { headers: authHeader() });

export const updateItem = (id, dto) =>
    API_URL.put(`/items/${id}`, dto, { headers: authHeader() });

export const deleteItem = (id) =>
    API_URL.delete(`/items/${id}`, { headers: authHeader() });
