import React, { useEffect, useState } from 'react';
import PaymentService from '../../services/PaymentService';
import OrderService from '../../services/OrderService';
import { useLocation } from 'react-router-dom';

function Payments() {
    const [payments, setPayments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId');

    // Чтение orderId из query
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const queryOrderId = params.get('orderId');

    useEffect(() => {
        if (queryOrderId) setSelectedOrderId(queryOrderId);
        loadData();
    }, [queryOrderId]);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const userPayments = await PaymentService.getPaymentsByUser(userId);
            setPayments(userPayments || []);

            const userOrders = await OrderService.getMyOrders();
            // Нормализация totalPrice
            const normalizedOrders = (userOrders || []).map(o => ({
                ...o.order,
                id: o.order.id,
                totalPrice: o.order.total_price ?? 0
            }));
            setOrders(normalizedOrders);
        } catch (e) {
            setError(e.message || 'Ошибка при загрузке данных');
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePayment = async () => {
        if (!selectedOrderId) {
            alert('Выберите заказ для оплаты');
            return;
        }

        setCreating(true);
        setError(null);

        try {
            const order = orders.find(o => o.id === parseInt(selectedOrderId));
            if (!order) throw new Error('Заказ не найден');

            const dto = {
                orderId: order.id,
                userId: parseInt(userId),
                paymentAmount: order.totalPrice,
                status: 'PENDING'
            };

            const newPayment = await PaymentService.createPayment(dto);
            setPayments(prev => [...prev, newPayment]);
            setSelectedOrderId('');
        } catch (e) {
            setError(e.message || 'Ошибка при создании платежа');
        } finally {
            setCreating(false);
        }
    };

    const handleDeletePayment = async (paymentId) => {
        if (!window.confirm('Удалить платеж?')) return;

        setError(null);
        try {
            await PaymentService.deletePayment(paymentId);
            setPayments(prev => prev.filter(p => p.id !== paymentId));
        } catch (e) {
            setError(e.message || 'Ошибка при удалении платежа');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Мои платежи</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div>Загрузка данных...</div>}

            {!loading && (
                <>
                    <div className="card p-3 mb-4">
                        <h5>Создать новый платеж</h5>
                        <div className="d-flex gap-2 align-items-center">
                            <select
                                className="form-select"
                                value={selectedOrderId}
                                onChange={e => setSelectedOrderId(e.target.value)}
                            >
                                <option value="">Выберите заказ</option>
                                {orders.map(o => (
                                    <option key={o.id} value={o.id}>
                                        Заказ #{o.id} — Сумма: {o.totalPrice.toFixed(2)} ₽ — Статус: {o.status}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="btn btn-primary"
                                onClick={handleCreatePayment}
                                disabled={creating}
                            >
                                {creating ? 'Создание...' : 'Создать платеж'}
                            </button>
                        </div>
                    </div>

                    {payments.length === 0 && <div>Платежи отсутствуют</div>}

                    {payments.length > 0 && (
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Заказ</th>
                                <th>Сумма</th>
                                <th>Статус</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {payments.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.orderId}</td>
                                    <td>{p.paymentAmount?.toFixed(2) || 0} ₽</td>
                                    <td>{p.status}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeletePayment(p.id)}
                                        >
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
}

export default Payments;
