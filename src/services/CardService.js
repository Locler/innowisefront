import * as api from '../api/cards';

class CardService {
    async getAllCards(params) {
        try {
            const res = await api.getAllCards(params);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при загрузке карт');
        }
    }

    async getCardsByUserId(userId) {
        try {
            const res = await api.getMyCards(userId);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при загрузке карт пользователя');
        }
    }

    async getCardById(id) {
        try {
            const res = await api.getCardById(id);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при получении карты');
        }
    }

    async createCard(userId, dto) {
        try {
            const res = await api.createCard(userId, dto);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при создании карты');
        }
    }

    async updateCard(id, dto) {
        try {
            const res = await api.updateCard(id, dto);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при обновлении карты');
        }
    }

    async deleteCard(id) {
        try {
            await api.deleteCard(id);
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при удалении карты');
        }
    }

    async activateCard(id) {
        try {
            const res = await api.activateCard(id);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при активации карты');
        }
    }

    async deactivateCard(id) {
        try {
            const res = await api.deactivateCard(id);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при деактивации карты');
        }
    }
}

export default new CardService();
