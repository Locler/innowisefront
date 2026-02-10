import axios from 'axios';

const API_URL = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

// Регистрация пользователя с profile + credentials
export const register = (body) =>
    API_URL.post(`/register`, body);

// Логин
export const login = (username, password) =>
    API_URL.post(`/auth/login`, { username, password });

// Валидация токена (для получения userId и роли)
export const validate = (token) =>
    API_URL.get(`/auth/validate`, { params: { token } });

// Обновление токена
export const refresh = (refreshToken) =>
    API_URL.post(`/auth/refresh`, null, { params: { refreshToken } });
