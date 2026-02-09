import * as api from '../api/cards';

class CardService {
    constructor() {
        this.roles = (localStorage.getItem('userRoles') || '').split(',');
    }

    isAdmin() {
        return this.roles.includes('ADMIN');
    }

    async getCardsByUserId(userId) {
        try {
            const res = await api.getMyCards(userId);
            return res.data;
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async getCardById(cardId) {
        try {
            const res = await api.getCardById(cardId);
            return res.data;
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async createCard(userId, card) {
        try {
            const res = await api.createCard(userId, card);
            return res.data;
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async updateCard(cardId, card) {
        try {
            const res = await api.updateCard(cardId, card);
            return res.data;
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async deleteCard(cardId) {
        if (!this.isAdmin()) throw new Error('Доступ только для администратора');
        try {
            await api.deleteCard(cardId);
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async activateCard(cardId) {
        if (!this.isAdmin()) throw new Error('Доступ только для администратора');
        try {
            await api.activateCard(cardId);
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async deactivateCard(cardId) {
        if (!this.isAdmin()) throw new Error('Доступ только для администратора');
        try {
            await api.deactivateCard(cardId);
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async getAllCards(pageable) {
        if (!this.isAdmin()) throw new Error('Доступ только для администратора');
        try {
            const res = await api.getAllCards(pageable);
            return res.data;
        } catch (err) {
            throw this.parseError(err);
        }
    }

    parseError(err) {
        if (err.response?.data?.message) return new Error(err.response.data.message);
        if (err.response?.data) return new Error(JSON.stringify(err.response.data));
        return new Error(err.message || 'Неизвестная ошибка');
    }
}

export default new CardService();
