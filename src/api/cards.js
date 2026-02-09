import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});

const API_URL = '';

export const getMyCards = (userId) =>
    axios.get(`${API_URL}/cards/users/${userId}`, { headers: authHeader() });

export const createCard = (userId, card) =>
    axios.post(`${API_URL}/cards/user/${userId}`, card, { headers: authHeader() });

export const updateCard = (cardId, card) =>
    axios.put(`${API_URL}/cards/${cardId}`, card, { headers: authHeader() });

export const deleteCard = (cardId) =>
    axios.delete(`${API_URL}/cards/${cardId}`, { headers: authHeader() });

export const activateCard = (cardId) =>
    axios.put(`${API_URL}/cards/${cardId}/activate`, {}, { headers: authHeader() });

export const deactivateCard = (cardId) =>
    axios.put(`${API_URL}/cards/${cardId}/deactivate`, {}, { headers: authHeader() });

export const getAllCards = (pageable) =>
    axios.get(`${API_URL}/cards`, { params: pageable, headers: authHeader() });

export const getCardById = (cardId) =>
    axios.get(`${API_URL}/cards/${cardId}`, { headers: authHeader() });

