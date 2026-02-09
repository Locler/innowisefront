import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || 'ADMIN'
});

export const getAllUsers = (params) =>
    axios.get('/users', { params, headers: authHeader() });

export const getUserById = (id) =>
    axios.get(`/users/${id}`, { headers: authHeader() });

export const getUserByEmail = (email) =>
    axios.get('/users/by-email', { params: { email }, headers: authHeader() });

export const createUser = (userDto) =>
    axios.post('/users', userDto, { headers: authHeader() });

export const updateUser = (id, userDto) =>
    axios.put(`/users/${id}`, userDto, { headers: authHeader() });

export const deleteUser = (id) =>
    axios.delete(`/users/${id}`, { headers: authHeader() });

export const activateUser = (id) =>
    axios.put(`/users/${id}/activate`, {}, { headers: authHeader() });

export const deactivateUser = (id) =>
    axios.put(`/users/${id}/deactivate`, {}, { headers: authHeader() });
