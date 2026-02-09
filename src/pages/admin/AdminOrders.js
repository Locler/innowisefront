import React, { useEffect, useState } from 'react';
import OrderService from '../../services/OrderService';
import OrderItemService from '../../services/OrderItemService';

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const ordersRes = await OrderService.getAllOrders({ page: 0, size: 100 });
            const itemsRes = await OrderItemService.getAllOrderItems({ page: 0, size: 100 });

            setOrders(ordersRes.content || []);
            setOrderItems(itemsRes.content || []);
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
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.user?.name || order.userId || '—'}</td>
                        <td>{order.status}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                            {orderItems
                                .filter(oi => oi.orderId === order.id)
                                .map(oi => `Item ${oi.itemId} x${oi.quantity}`)
                                .join(', ')}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminOrders;
