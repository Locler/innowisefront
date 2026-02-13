import React, { useEffect, useState, useCallback } from 'react';
import OrderService from '../../services/OrderService';
import ItemService from '../../services/ItemService';
import { useNavigate } from 'react-router-dom';

const normalizeOrder = (dto) => ({
    id: dto.order?.id,
    status: dto.order?.status,
    totalPrice: dto.order?.total_price ?? 0, // <-- теперь есть totalPrice
    items: dto.order?.orderItems ?? []
});

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingOrder, setEditingOrder] = useState(null);
    const [formItems, setFormItems] = useState([{ itemId: '', quantity: 1 }]);
    const [availableItems, setAvailableItems] = useState([]);

    const navigate = useNavigate();

    const loadOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await OrderService.getMyOrders();
            setOrders((res || []).map(normalizeOrder));
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    useEffect(() => {
        const loadAvailableItems = async () => {
            try {
                const res = await ItemService.getAllItems({ page: 0, size: 100 });
                setAvailableItems(res.content || []);
            } catch (e) {
                console.error('Ошибка загрузки товаров', e);
            }
        };
        loadAvailableItems();
    }, []);

    const handleCancel = async (id) => {
        if (!window.confirm('Отменить заказ?')) return;
        try {
            await OrderService.updateStatus(id, 'CANCELLED');
            setOrders(prev =>
                prev.map(o => o.id === id ? { ...o, status: 'CANCELLED' } : o)
            );
        } catch (e) {
            alert(e.message);
        }
    };

    const handlePay = (order) => {
        // Передаём orderId и totalPrice в query
        navigate(`/payments?orderId=${order.id}`);
    };

    const openEditForm = (order) => {
        setEditingOrder(order);
        setFormItems(order.items.length
            ? order.items.map(i => ({ itemId: i.itemId, quantity: i.quantity }))
            : [{ itemId: '', quantity: 1 }]
        );
    };

    const openNewForm = () => {
        setEditingOrder(null);
        setFormItems([{ itemId: '', quantity: 1 }]);
    };

    const handleFormChange = (index, field, value) => {
        const newItems = [...formItems];
        newItems[index][field] = field === 'quantity' ? Number(value) : Number(value);
        setFormItems(newItems);
    };

    const addItemField = () => setFormItems([...formItems, { itemId: '', quantity: 1 }]);
    const removeItemField = (index) => setFormItems(formItems.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка существования товаров
        for (const item of formItems) {
            const id = Number(item.itemId);
            if (!id || !availableItems.find(i => i.id === id)) {
                alert(`Товар с ID=${item.itemId} не существует!`);
                return;
            }
        }

        const dto = { orderItems: formItems.filter(i => i.itemId) };
        try {
            if (editingOrder) {
                await OrderService.updateOrder(editingOrder.id, dto);
                alert('Заказ обновлён');
            } else {
                await OrderService.createOrder(dto);
                alert('Заказ создан');
            }
            setEditingOrder(null);
            setFormItems([{ itemId: '', quantity: 1 }]);
            loadOrders();
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2>Мои заказы</h2>
                <button className="btn btn-success" onClick={openNewForm}>Создать заказ</button>
            </div>

            {loading && <div>Загрузка...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {(editingOrder !== null || formItems.length) && (
                <form className="mb-4 border p-3" onSubmit={handleSubmit}>
                    <h5>{editingOrder ? `Редактирование заказа #${editingOrder.id}` : 'Новый заказ'}</h5>
                    {formItems.map((item, idx) => (
                        <div key={idx} className="d-flex gap-2 mb-2 align-items-center">
                            <select
                                className="form-control"
                                value={item.itemId}
                                onChange={e => handleFormChange(idx, 'itemId', e.target.value)}
                                required
                            >
                                <option value="">Выберите товар</option>
                                {availableItems.map(i => (
                                    <option key={i.id} value={i.id}>{i.name}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={e => handleFormChange(idx, 'quantity', e.target.value)}
                                className="form-control"
                                required
                            />
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeItemField(idx)}>×</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-outline-primary btn-sm mb-2" onClick={addItemField}>Добавить элемент</button>
                    <br />
                    <button type="submit" className="btn btn-primary">{editingOrder ? 'Сохранить' : 'Создать'}</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingOrder(null)}>Отмена</button>
                </form>
            )}

            {!loading && !error && (
                <table className="table table-striped align-middle">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Статус</th>
                        <th>Сумма</th>
                        <th>Элементы</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-5 text-muted">
                                <h5>У вас пока нет заказов</h5>
                                <p className="mb-0">Заказы появятся после оформления покупки</p>
                            </td>
                        </tr>
                    ) : (
                        orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.status || '—'}</td>
                                <td>{order.totalPrice.toFixed(2)} ₽</td>
                                <td>{order.items.length ? order.items.map(i => `ID:${i.itemId} x${i.quantity}`).join(', ') : '—'}</td>
                                <td className="d-flex gap-2">
                                    {order.status === 'NEW' && (
                                        <>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleCancel(order.id)}>Отменить</button>
                                            <button className="btn btn-sm btn-primary" onClick={() => handlePay(order)}>Оплатить</button>
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => openEditForm(order)}>Редактировать</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Orders;
