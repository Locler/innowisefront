
import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

const API_URL = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

export const getAllUsers = (params) =>
    API_URL.get(`/users`, { params, headers: authHeader() });

export const getUserById = (id) =>
    API_URL.get(`/users/${id}`, { headers: authHeader() });

export const getUserByEmail = (email) =>
    API_URL.get(`/users/by-email`, { params: { email }, headers: authHeader() });

export const createUser = (userDto) =>
    API_URL.post(`/users`, userDto, { headers: authHeader() });

export const updateUser = (id, userDto) =>
    API_URL.put(`/users/${id}`, userDto, { headers: authHeader() });

export const deleteUser = (id) =>
    API_URL.delete(`/users/${id}`, { headers: authHeader() });

export const activateUser = (id) =>
    API_URL.put(`/users/${id}/activate`, {}, { headers: authHeader() });

export const deactivateUser = (id) =>
    API_URL.put(`/users/${id}/deactivate`, {}, { headers: authHeader() });
