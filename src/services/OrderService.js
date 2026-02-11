import * as api from '../api/orders';

class OrderService {
    async getMyOrders() {
        try {
            const res = await api.getMyOrders();
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при загрузке ваших заказов');
        }
    }

    async getOrder(id) {
        try {
            const res = await api.getOrderById(id);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при получении заказа');
        }
    }

    async getAllOrders(params) {
        try {
            const res = await api.getAllOrders(params);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при загрузке заказов');
        }
    }

    async createOrder(dto) {
        try {
            const res = await api.createOrder(dto);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при создании заказа');
        }
    }

    async updateOrder(id, dto) {
        try {
            const res = await api.updateOrder(id, dto);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при обновлении заказа');
        }
    }

    async updateStatus(id, status) {
        try {
            const res = await api.updateOrderStatus(id, status);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при обновлении статуса заказа');
        }
    }

    async deleteOrder(id) {
        try {
            await api.deleteOrder(id);
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при удалении заказа');
        }
    }
}

export default new OrderService();
