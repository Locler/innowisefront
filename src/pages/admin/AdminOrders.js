import React, { useEffect, useState, useCallback } from 'react';
import OrderService from '../../services/OrderService';

/**
 * FSM с backend
 */
const STATUS_TRANSITIONS = {
    NEW: ["PAID", "CANCELLED"],
    PAID: ["COMPLETED"],
    COMPLETED: [],
    CANCELLED: []
};


const normalizeOrder = (owu) => ({
    id: owu.order?.id,
    status: owu.order?.status,
    totalPrice: owu.order?.total_price ?? 0,
    items: owu.order?.orderItems ?? [],
    user: owu.user
        ? `${owu.user.name} ${owu.user.surname}`
        : '—'
});

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await OrderService.getAllOrders({ page: 0, size: 100 });
            const normalized = (res.content || []).map(normalizeOrder);
            setOrders(normalized);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleDelete = async (id) => {
        if (!window.confirm('Удалить заказ?')) return;

        try {
            await OrderService.deleteOrder(id);
            setOrders(prev => prev.filter(o => o.id !== id));
        } catch (e) {
            alert(e.message);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await OrderService.updateStatus(id, newStatus);

            setOrders(prev =>
                prev.map(o =>
                    o.id === id
                        ? { ...o, status: newStatus }
                        : o
                )
            );
        } catch (e) {
            alert(e.message);
        }
    };

    if (loading)
        return (
            <div className="container mt-4">
                Загрузка...
            </div>
        );

    if (error)
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">{error}</div>
            </div>
        );

    return (
        <div className="container mt-4">
            <h2>Админ: Заказы</h2>

            <table className="table table-striped align-middle">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Пользователь</th>
                    <th>Статус</th>
                    <th>Сумма</th>
                    <th>Элементы заказа</th>
                    <th>Действия</th>
                </tr>
                </thead>

                <tbody>
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center py-5">
                            <div className="text-muted">
                                <h5>Заказов пока нет</h5>
                                <p className="mb-0">
                                    Они появятся после оформления пользователями
                                </p>
                            </div>
                        </td>
                    </tr>
                ) : (
                    orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>

                            <td>{order.user}</td>

                            <td>
                                {STATUS_TRANSITIONS[order.status]?.length > 0 ? (
                                    <select
                                        className="form-select form-select-sm"
                                        value={order.status}
                                        onChange={(e) =>
                                            handleStatusChange(order.id, e.target.value)
                                        }
                                    >
                                        <option value={order.status}>
                                            {order.status}
                                        </option>

                                        {STATUS_TRANSITIONS[order.status].map(s => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <span>{order.status}</span>
                                )}
                            </td>

                            <td>
                                {Number(order.totalPrice).toFixed(2)} ₽
                            </td>

                            <td>
                                {order.items.length
                                    ? order.items
                                        .map(
                                            item =>
                                                `ID:${item.itemId} x${item.quantity}`
                                        )
                                        .join(', ')
                                    : '—'}
                            </td>

                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(order.id)}
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminOrders;
