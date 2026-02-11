import axios from 'axios';

export const API_URL = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});
// Регистрация
export const register = (body) => API_URL.post(`/register`, body);

// Логин
export const login = (username, password) =>
    API_URL.post(`/auth/login`, { username, password });

// Валидация токена — header подставляется автоматически
export const validate = () => API_URL.get(`/auth/validate`);

// Обновление токена
export const refresh = (refreshToken) =>
    API_URL.post(`/auth/refresh`, null, { params: { refreshToken } });
