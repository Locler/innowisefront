import React, { useEffect, useState } from 'react';
import ItemService from '../../services/ItemService';

function Items() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await ItemService.getAllItems({ page: 0, size: 100 });
            setItems(res.content || []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Товары</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div>Загрузка...</div>}

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Цена</th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Items;
