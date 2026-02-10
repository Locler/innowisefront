import * as api from "../api/oderItems"

class OrderItemService {
    async getOrderItem(id) {
        try {
            const res = await api.getOrderItem(id);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при получении OrderItem');
        }
    }

    async getAllOrderItems(params) {
        try {
            const res = await api.getAllOrderItems(params);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при загрузке списка OrderItem');
        }
    }

    async createOrderItem(dto) {
        try {
            const res = await api.createOrderItem(dto);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при создании OrderItem');
        }
    }

    async updateOrderItem(id, dto) {
        try {
            const res = await api.updateOrderItem(id, dto);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при обновлении OrderItem');
        }
    }

    async deleteOrderItem(id) {
        try {
            await api.deleteOrderItem(id);
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при удалении OrderItem');
        }
    }
}

export default new OrderItemService();
