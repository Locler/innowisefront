import axios from 'axios';

// Относительный путь через API Gateway в k8s const API_BASE = process.env.REACT_APP_API_GATEWAY_URL || 'http://innowise.local';
const API_URL = '';

export const login = (username, password) =>
    axios.post(`${API_URL}/auth/login`, { username, password });

export const register = (userId, username, password, role = 'USER') =>
    axios.post(`${API_URL}/auth/register`, { userId, username, password, role });

export const validate = (token) =>
    axios.get(`${API_URL}/auth/validate`, { params: { token } });

export const refresh = (refreshToken) =>
    axios.post(`${API_URL}/auth/refresh`, null, { params: { refreshToken } });