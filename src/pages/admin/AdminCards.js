import React, { useEffect, useState } from 'react';
import CardService from '../../services/CardService';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminCards() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        userId: '',
        number: '',
        holder: '',
        expirationDate: '',
        active: true
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await CardService.getAllCards({ page: 0, size: 100 });
            setCards(res.content || []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);

        try {
            if (editingId) {
                // ✅ правильный DTO как в Postman
                const updateDto = {
                    number: form.number,
                    holder: form.holder,
                    expirationDate: form.expirationDate,
                    active: form.active
                };

                await CardService.updateCard(editingId, updateDto);
                setEditingId(null);
            } else {
                if (!form.userId) return alert('Укажите User ID');

                await CardService.createCard(form.userId, {
                    number: form.number,
                    holder: form.holder,
                    expirationDate: form.expirationDate
                });
            }

            setForm({
                userId: '',
                number: '',
                holder: '',
                expirationDate: '',
                active: true
            });

            await loadCards();
        } catch (e) {
            setError(e.message);
        }
    };

    const handleEdit = card => {
        setForm({
            userId: card.userId,
            number: card.number,
            holder: card.holder,
            expirationDate: card.expirationDate,
            active: card.active
        });
        setEditingId(card.id);
    };

    const handleDelete = async id => {
        if (!window.confirm('Удалить карту?')) return;
        setError(null);
        try {
            await CardService.deleteCard(id);
            setCards(prev => prev.filter(c => c.id !== id));
        } catch (e) {
            setError(e.message);
        }
    };

    const toggleActive = async card => {
        setError(null);
        try {
            if (card.active) await CardService.deactivateCard(card.id);
            else await CardService.activateCard(card.id);
            await loadCards();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Админ: Карты</h2>

            {/* Форма */}
            <form onSubmit={handleSubmit} className="card p-3 mb-4">
                <h5>{editingId ? 'Редактировать карту' : 'Создать карту'}</h5>

                {!editingId && (
                    <input
                        type="number"
                        className="form-control mb-2"
                        name="userId"
                        placeholder="User ID"
                        value={form.userId}
                        onChange={handleChange}
                        required
                    />
                )}

                <input
                    type="text"
                    className="form-control mb-2"
                    name="number"
                    placeholder="Номер карты"
                    value={form.number}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    className="form-control mb-2"
                    name="holder"
                    placeholder="Владелец"
                    value={form.holder}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    className="form-control mb-2"
                    name="expirationDate"
                    value={form.expirationDate}
                    onChange={handleChange}
                    required
                />

                {/*active только при редактировании */}
                {editingId && (
                    <div className="form-check mb-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="active"
                            checked={form.active}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Активна</label>
                    </div>
                )}

                {error && <div className="alert alert-danger">{error}</div>}

                <button className="btn btn-primary">
                    {editingId ? 'Обновить' : 'Создать'}
                </button>
            </form>

            {/* Таблица */}
            {loading && <div>Загрузка карт...</div>}

            {!loading && cards.length > 0 && (
                <div className="card p-3">
                    <h5>Список карт</h5>
                    <table className="table table-striped table-bordered align-middle mb-0">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Номер карты</th>
                            <th>Владелец</th>
                            <th>Срок действия</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cards.map(card => (
                            <tr key={card.id}>
                                <td>{card.id}</td>
                                <td>{card.userId}</td>
                                <td>{card.number}</td>
                                <td>{card.holder}</td>
                                <td>{card.expirationDate}</td>
                                <td>{card.active ? 'Активна' : 'Неактивна'}</td>
                                <td className="d-flex gap-2">
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => toggleActive(card)}
                                    >
                                        {card.active ? 'Деактивировать' : 'Активировать'}
                                    </button>

                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => handleEdit(card)}
                                    >
                                        Редактировать
                                    </button>

                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(card.id)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && cards.length === 0 && (
                <div className="text-muted">Карт пока нет</div>
            )}
        </div>
    );
}

export default AdminCards;