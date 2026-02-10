import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

const API_URL = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

export const getMyCards = (userId) =>
    API_URL.get(`/cards/users/${userId}`, { headers: authHeader() });

export const createCard = (userId, card) =>
    API_URL.post(`/cards/user/${userId}`, card, { headers: authHeader() });

export const updateCard = (cardId, card) =>
    API_URL.put(`/cards/${cardId}`, card, { headers: authHeader() });

export const deleteCard = (cardId) =>
    API_URL.delete(`/cards/${cardId}`, { headers: authHeader() });

export const activateCard = (cardId) =>
    API_URL.put(`/cards/${cardId}/activate`, {}, { headers: authHeader() });

export const deactivateCard = (cardId) =>
    API_URL.put(`/cards/${cardId}/deactivate`, {}, { headers: authHeader() });

export const getAllCards = (pageable) =>
    API_URL.get(`/cards`, { params: pageable, headers: authHeader() });

export const getCardById = (cardId) =>
    API_URL.get(`/cards/${cardId}`, { headers: authHeader() });

