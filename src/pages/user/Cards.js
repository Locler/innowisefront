import { useEffect, useState } from 'react';
import CardService from '../../services/CardService';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cards() {
    const [cards, setCards] = useState([]);
    const [form, setForm] = useState({ number: '', holder: '', expirationDate: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await CardService.getCardsByUserId(userId);
            setCards(res || []);
        } catch (e) {
            setError(e.response?.data?.message || e.message || 'Не удалось загрузить карты');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            if (editingId) {
                await CardService.updateCard(editingId, { ...form, userId });
            } else {
                await CardService.createCard(userId, { ...form });
            }
            setForm({ number: '', holder: '', expirationDate: '' });
            setEditingId(null);
            await loadCards();
        } catch (e) {
            if (e.response?.data?.errors) setError(e.response.data.errors);
            else setError(e.response?.data?.message || e.message || 'Ошибка запроса');
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (card) => {
        setEditingId(card.id);
        setForm({ number: card.number, holder: card.holder, expirationDate: card.expirationDate });
        setError(null);
    };

    return (
        <div className="container mt-4">
            <h2>Мои карты</h2>

            {/* Форма добавления/редактирования карты */}
            <form onSubmit={handleSubmit} className="card p-3 mb-4">
                <h5>{editingId ? 'Обновить карту' : 'Добавить карту'}</h5>

                <input className="form-control mb-2" name="number" placeholder="Номер карты" value={form.number} onChange={handleChange} />
                {error?.number && <div className="text-danger">{error.number}</div>}

                <input className="form-control mb-2" name="holder" placeholder="Владелец карты" value={form.holder} onChange={handleChange} />
                {error?.holder && <div className="text-danger">{error.holder}</div>}

                <input type="date" className="form-control mb-2" name="expirationDate" value={form.expirationDate} onChange={handleChange} />
                {error?.expirationDate && <div className="text-danger">{error.expirationDate}</div>}

                {typeof error === 'string' && <div className="alert alert-danger">{error}</div>}

                <button className="btn btn-primary" disabled={loading}>{loading ? 'Сохранение...' : 'Сохранить'}</button>
            </form>

            {/* Таблица карт */}
            {cards.length > 0 && (
                <div className="card p-3">
                    <h5>Ваши карты</h5>
                    <table className="table table-striped table-bordered align-middle mb-0">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Номер карты</th>
                            <th>Владелец</th>
                            <th>Срок действия</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cards.map(card => (
                            <tr key={card.id}>
                                <td>{card.id}</td>
                                <td>{card.number}</td>
                                <td>{card.holder}</td>
                                <td>{card.expirationDate}</td>
                                <td className="d-flex gap-2">
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => startEdit(card)} disabled={loading}>
                                        Редактировать
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {loading && !cards.length && <div>Загрузка карт...</div>}
            {cards.length === 0 && !loading && <div className="text-muted">Карты отсутствуют</div>}
        </div>
    );
}

export default Cards;
