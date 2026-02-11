import * as api from '../api/payments';

class PaymentService {

    // Создание нового платежа
    async createPayment(dto) {
        try {
            const res = await api.createPayment(dto);
            return res.data; // вернёт созданный платеж
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при создании платежа');
        }
    }

    // Получение конкретного платежа
    async getPayment(id) {
        try {
            const res = await api.getPaymentById(id);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при получении платежа');
        }
    }

    // Получение всех платежей пользователя
    async getPaymentsByUser(userId) {
        try {
            const res = await api.getPaymentsByUser(userId);
            return res.data || [];
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при получении платежей пользователя');
        }
    }

    // Получение всех платежей по заказу (для админа)
    async getPaymentsByOrder(orderId) {
        try {
            const res = await api.getPaymentsByOrder(orderId);
            return res.data || [];
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при получении платежей по заказу');
        }
    }

    // Обновление статуса платежа (для админа)
    async updateStatus(id, status) {
        try {
            const res = await api.updatePaymentStatus(id, status.toUpperCase());
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при обновлении статуса платежа');
        }
    }

    // Удаление платежа
    async deletePayment(id) {
        try {
            await api.deletePayment(id);
            return true;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при удалении платежа');
        }
    }
}

export default new PaymentService();
