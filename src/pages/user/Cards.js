import { useEffect, useState } from 'react';
import CardService from '../../services/CardService';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cards() {
    const [cards, setCards] = useState([]);
    const [form, setForm] = useState({
        number: '',
        holder: '',
        expirationDate: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = async () => {
        try {
            const res = await CardService.getCardsByUserId(userId);
            setCards(res.data);
        } catch {
            setError('Не удалось загрузить карты');
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
            if (e.response) {
                if (e.response.data?.errors) setError(e.response.data.errors);
                else if (e.response.data?.message) setError(e.response.data.message);
                else setError('Ошибка запроса');
            } else setError('Сервер недоступен');
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (card) => {
        setEditingId(card.id);
        setForm({
            number: card.number,
            holder: card.holder,
            expirationDate: card.expirationDate
        });
        setError(null);
    };

    return (
        <div className="container mt-4">
            <h2>Мои карты</h2>

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

            <ul className="list-group">
                {cards.map(card => (
                    <li key={card.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{card.number}</strong> — {card.holder} <br />
                            до {card.expirationDate}
                        </div>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => startEdit(card)}>Редактировать</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cards;
