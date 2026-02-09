import * as api from '../api/payments';

class PaymentService {

    async createPayment(dto) {
        try {
            const res = await api.createPayment(dto);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при создании платежа');
        }
    }

    async getPayment(id) {
        try {
            const res = await api.getPaymentById(id);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при получении платежа');
        }
    }

    async getPaymentsByUser(userId) {
        try {
            const res = await api.getPaymentsByUser(userId);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при получении платежей пользователя');
        }
    }

    async getPaymentsByOrder(orderId) {
        try {
            const res = await api.getPaymentsByOrder(orderId);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при получении платежей по заказу');
        }
    }

    async updateStatus(id, status) {
        try {
            const res = await api.updatePaymentStatus(id, status);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при обновлении статуса платежа');
        }
    }

    async deletePayment(id) {
        try {
            await api.deletePayment(id);
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при удалении платежа');
        }
    }

}

export default new PaymentService();
