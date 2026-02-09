import React, { useEffect, useState } from 'react';
import OrderService from '../../services/OrderService';

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await OrderService.getAllOrders({ page: 0, size: 100 });
            setOrders(res.content || []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Админ: Заказы</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div>Загрузка...</div>}

            {!loading && !error && (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Пользователь</th>
                        <th>Статус</th>
                        <th>Сумма</th>
                        <th>Элементы заказа</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(owu => (
                        <tr key={owu.order?.id}>
                            <td>{owu.order?.id}</td>
                            <td>{owu.user?.name || '—'}</td>
                            <td>{owu.order?.status}</td>
                            <td>{owu.order?.totalPrice?.toFixed(2) || 0} ₽</td>
                            <td>
                                {owu.order?.orderItems?.length
                                    ? owu.order.orderItems.map(oi => `Item ${oi.itemId} x${oi.quantity}`).join(', ')
                                    : '—'}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminOrders;
