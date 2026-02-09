import React, { useEffect, useState } from 'react';
import OrderItemService from '../../services/OrderItemService';
import OrderService from '../../services/OrderService';
import ItemService from '../../services/ItemService';

function OrderItems() {
    const userId = Number(localStorage.getItem('userId'));

    const [orderItems, setOrderItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({ orderId: '', itemId: '', quantity: 1 });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // USER видит только свои заказы
            const ordersRes = await OrderService.getAllOrders({ page: 0, size: 100 });
            const myOrders = ordersRes.content.filter(o => o.user?.id === userId);

            const itemsRes = await ItemService.getAllItems({ page: 0, size: 100 });

            // OrderItems только для своих заказов
            const orderItemsRes = await OrderItemService.getAllOrderItems({ page: 0, size: 100 });
            const myOrderItems = orderItemsRes.content.filter(oi => myOrders.some(o => o.id === oi.orderId));

            setOrders(myOrders);
            setItems(itemsRes.content);
            setOrderItems(myOrderItems);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        try {
            if (editingId) {
                await OrderItemService.updateOrderItem(editingId, form);
                setEditingId(null);
            } else {
                await OrderItemService.createOrderItem(form);
            }
            setForm({ orderId: '', itemId: '', quantity: 1 });
            loadData();
        } catch (e) {
            setError(e.message);
        }
    };

    const handleEdit = item => {
        setForm({ orderId: item.orderId, itemId: item.itemId, quantity: item.quantity });
        setEditingId(item.id);
    };

    const handleDelete = async id => {
        if (!window.confirm('Вы уверены, что хотите удалить этот OrderItem?')) return;
        setError(null);
        try {
            await OrderItemService.deleteOrderItem(id);
            loadData();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Мои OrderItems</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div>Загрузка...</div>}

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row mb-2">
                    <div className="col">
                        <label>Заказ</label>
                        <select
                            className="form-select"
                            name="orderId"
                            value={form.orderId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Выберите заказ</option>
                            {orders.map(o => (
                                <option key={o.id} value={o.id}>#{o.id} - {o.status}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <label>Товар</label>
                        <select
                            className="form-select"
                            name="itemId"
                            value={form.itemId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Выберите товар</option>
                            {items.map(i => (
                                <option key={i.id} value={i.id}>{i.name} (${i.price})</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <label>Количество</label>
                        <input
                            type="number"
                            className="form-control"
                            name="quantity"
                            value={form.quantity}
                            min="1"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    {editingId ? 'Обновить' : 'Создать'}
                </button>
            </form>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Заказ ID</th>
                    <th>Товар</th>
                    <th>Количество</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {orderItems.map(oi => (
                    <tr key={oi.id}>
                        <td>{oi.orderId}</td>
                        <td>{items.find(i => i.id === oi.itemId)?.name || oi.itemId}</td>
                        <td>{oi.quantity}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(oi)}>Редактировать</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(oi.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderItems;
