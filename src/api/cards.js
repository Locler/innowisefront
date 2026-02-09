import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'X-User-Roles': localStorage.getItem('userRoles') || '',
    'X-User-Id': localStorage.getItem('userId') || ''
});


export const getMyCards = (userId) =>
    axios.get(`/cards/users/${userId}`, { headers: authHeader() });

export const createCard = (userId, card) =>
    axios.post(`/cards/user/${userId}`, card, { headers: authHeader() });

export const updateCard = (cardId, card) =>
    axios.put(`/cards/${cardId}`, card, { headers: authHeader() });

export const deleteCard = (cardId) =>
    axios.delete(`/cards/${cardId}`, { headers: authHeader() });

export const activateCard = (cardId) =>
    axios.put(`/cards/${cardId}/activate`, {}, { headers: authHeader() });

export const deactivateCard = (cardId) =>
    axios.put(`/cards/${cardId}/deactivate`, {}, { headers: authHeader() });

export const getAllCards = (pageable) =>
    axios.get('/cards', { params: pageable, headers: authHeader() });

export const getCardById = (cardId) =>
    axios.get(`/cards/${cardId}`, { headers: authHeader() });

