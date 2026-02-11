import React, { useEffect, useState } from 'react';
import CardService from '../../services/CardService';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminCards() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({ userId: '', number: '', holder: '', expirationDate: '' });
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
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        try {
            if (editingId) {
                await CardService.updateCard(editingId, form);
                setEditingId(null);
            } else {
                if (!form.userId) return alert('Укажите User ID');
                await CardService.createCard(form.userId, form);
            }
            setForm({ userId: '', number: '', holder: '', expirationDate: '' });
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
            expirationDate: card.expirationDate
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

            <form onSubmit={handleSubmit} className="card p-3 mb-4">
                <h5>{editingId ? 'Редактировать карту' : 'Создать карту'}</h5>
                <input
                    type="number"
                    className="form-control mb-2"
                    name="userId"
                    placeholder="User ID"
                    value={form.userId}
                    onChange={handleChange}
                    required={!editingId}
                />
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
                    placeholder="Срок действия"
                    value={form.expirationDate}
                    onChange={handleChange}
                    required
                />
                {error && <div className="alert alert-danger">{error}</div>}
                <button className="btn btn-primary">{editingId ? 'Обновить' : 'Создать'}</button>
            </form>

            {loading && <div>Загрузка карт...</div>}

            {!loading && cards.length > 0 && (
                <ul className="list-group">
                    {cards.map(card => (
                        <li key={card.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{card.number}</strong> — {card.holder} <br />
                                До {card.expirationDate} — {card.active ? 'Активна' : 'Неактивна'}
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-warning" onClick={() => toggleActive(card)}>
                                    {card.active ? 'Деактивировать' : 'Активировать'}
                                </button>
                                <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(card)}>
                                    Редактировать
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(card.id)}>
                                    Удалить
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdminCards;
