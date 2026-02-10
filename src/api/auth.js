import axios from 'axios';

// Относительный путь через API Gateway в k8s const API_BASE = process.env.REACT_APP_API_GATEWAY_URL || 'http://innowise.local';
const API_URL = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

export const login = (username, password) =>
    API_URL.post(`/auth/login`, {username, password});

export const register = (userId, username, password, role = 'ROLE_USER') =>
    API_URL.post(`/register`, {
        credentials: {username, password, role},
        profile: {userId}
    });

export const validate = (token) =>
    API_URL.get(`/auth/validate`, {params: {token}});

export const refresh = (refreshToken) =>
    API_URL.post(`/auth/refresh`, null, {params: {refreshToken}});