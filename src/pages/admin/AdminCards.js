import { useEffect, useState } from 'react';
import CardService from '../../services/CardService';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminCards() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const admin = CardService.isAdmin();
        setIsAdmin(admin);
        if (!admin) return;
        loadAllCards();
    }, []);

    const loadAllCards = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await CardService.getAllCards();
            setCards(res.data?.content || []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleActive = async (card) => {
        setLoading(true);
        try {
            if (card.active) await CardService.deactivateCard(card.id);
            else await CardService.activateCard(card.id);
            await loadAllCards();
        } catch (e) {
            setError(e.message);
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
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) return <div className="alert alert-warning mt-4">Доступ только для администратора</div>;

    return (
        <div className="container mt-4">
            <h2>Админ — Все карты</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && !cards.length && <div>Загрузка карт...</div>}

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
