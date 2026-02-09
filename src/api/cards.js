import axios from 'axios';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
});

export const getMyCards = (userId) =>
    axios.get(`/cards/users/${userId}`, {
        headers: authHeader()
    });

export const createCard = (userId, card) =>
    axios.post(`/cards/user/${userId}`, card, {
        headers: authHeader()
    });

export const updateCard = (cardId, card) =>
    axios.put(`/cards/${cardId}`, card, {
        headers: authHeader()
    });
