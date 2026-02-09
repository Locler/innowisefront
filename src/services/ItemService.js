import * as api from '../api/items';

class ItemService {

    async getItem(id) {
        try {
            const res = await api.getItem(id);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при получении Item');
        }
    }

    async getAllItems(params) {
        try {
            const res = await api.getAllItems(params);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при загрузке списка Item');
        }
    }

    async createItem(dto) {
        try {
            const res = await api.createItem(dto);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при создании Item');
        }
    }

    async updateItem(id, dto) {
        try {
            const res = await api.updateItem(id, dto);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при обновлении Item');
        }
    }

    async deleteItem(id) {
        try {
            await api.deleteItem(id);
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при удалении Item');
        }
    }
}

export default new ItemService();
