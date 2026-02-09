import { useEffect, useState } from 'react';
import CardService from '../../services/CardService';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminCards() {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const roles = localStorage.getItem('userRoles');
        if (!roles?.includes('ADMIN')) {
            alert('Нет доступа!');
            return;
        }
        loadAllCards();
    }, []);

    const loadAllCards = async () => {
        try {
            const res = await CardService.getAllCards();
            setCards(res.data.content || []);
        } catch {
            setError('Не удалось загрузить карты');
        }
    };

    const toggleActive = async (card) => {
        setLoading(true);
        try {
            if (card.active) await CardService.deactivateCard(card.id);
            else await CardService.activateCard(card.id);
            await loadAllCards();
        } catch {
            setError('Ошибка при смене статуса карты');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Удалить карту?')) return;
        setLoading(true);
        try {
            await CardService.deleteCard(id);
            await loadAllCards();
        } catch {
            setError('Ошибка при удалении карты');
        } finally {
            setLoading(false);
        }
    };

    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Админ — Все карты</h2>

            <ul className="list-group">
                {cards.map(card => (
                    <li key={card.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{card.number}</strong> — {card.holder} <br />
                            до {card.expirationDate} — {card.active ? 'Активна' : 'Неактивна'}
                        </div>
                        <div>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => toggleActive(card)} disabled={loading}>
                                {card.active ? 'Деактивировать' : 'Активировать'}
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(card.id)} disabled={loading}>
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminCards;
