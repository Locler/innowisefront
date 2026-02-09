
import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

const API_URL = '';

export const getAllUsers = (params) =>
    axios.get(`${API_URL}/users`, { params, headers: authHeader() });

export const getUserById = (id) =>
    axios.get(`${API_URL}/users/${id}`, { headers: authHeader() });

export const getUserByEmail = (email) =>
    axios.get(`${API_URL}/users/by-email`, { params: { email }, headers: authHeader() });

export const createUser = (userDto) =>
    axios.post(`${API_URL}/users`, userDto, { headers: authHeader() });

export const updateUser = (id, userDto) =>
    axios.put(`${API_URL}/users/${id}`, userDto, { headers: authHeader() });

export const deleteUser = (id) =>
    axios.delete(`${API_URL}/users/${id}`, { headers: authHeader() });

export const activateUser = (id) =>
    axios.put(`${API_URL}/users/${id}/activate`, {}, { headers: authHeader() });

export const deactivateUser = (id) =>
    axios.put(`${API_URL}/users/${id}/deactivate`, {}, { headers: authHeader() });
