import React, { useEffect, useState } from 'react';
import CardService from '../../services/CardService';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminCards() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const toggleActive = async card => {
        setError(null);
        try {
            if (card.active) await CardService.deactivateCard(card.id);
            else await CardService.activateCard(card.id);
            loadCards();
        } catch (e) {
            setError(e.message);
        }
    };

    const handleDelete = async id => {
        if (!window.confirm('Удалить карту?')) return;
        setError(null);
        try {
            await CardService.deleteCard(id);
            loadCards();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Админ: Карты</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div>Загрузка карт...</div>}

            {!loading && cards.length > 0 && (
                <ul className="list-group">
                    {cards.map(card => (
                        <li key={card.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{card.number}</strong> — {card.holder} <br />
                                До {card.expirationDate} — {card.active ? 'Активна' : 'Неактивна'}
                            </div>
                            <div>
                                <button className="btn btn-sm btn-warning me-2" onClick={() => toggleActive(card)}>
                                    {card.active ? 'Деактивировать' : 'Активировать'}
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(card.id)}>Удалить</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdminCards;
