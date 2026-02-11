import React, { useEffect, useState } from 'react';
import OrderService from '../../services/OrderService';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await OrderService.getMyOrders();
            setOrders(res);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Мои Заказы</h2>

            {loading && <div>Загрузка...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && orders.length === 0 && <div>Заказы отсутствуют</div>}

            {!loading && !error && orders.length > 0 && (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Статус</th>
                        <th>Сумма</th>
                        <th>Элементы заказа</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(orderDto => (
                        <tr key={orderDto.order.id}>
                            <td>{orderDto.order.id}</td>
                            <td>{orderDto.order.status}</td>
                            <td>{orderDto.order.totalPrice?.toFixed(2) || 0} ₽</td>
                            <td>
                                {orderDto.order.orderItems?.length
                                    ? orderDto.order.orderItems
                                        .map(oi => `Item ${oi.itemId} x${oi.quantity}`)
                                        .join(', ')
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

export default Orders;
