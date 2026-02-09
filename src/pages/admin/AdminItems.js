import React, { useEffect, useState } from 'react';
import ItemService from '../../services/ItemService';

function AdminItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({ name: '', price: 0 });
    const [editingId, setEditingId] = useState(null);

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

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        try {
            if (editingId) {
                await ItemService.updateItem(editingId, form);
                setEditingId(null);
            } else {
                await ItemService.createItem(form);
            }
            setForm({ name: '', price: 0 });
            loadItems();
        } catch (e) {
            setError(e.message);
        }
    };

    const handleEdit = item => {
        setForm({ name: item.name, price: item.price });
        setEditingId(item.id);
    };

    const handleDelete = async id => {
        if (!window.confirm('Удалить этот Item?')) return;
        setError(null);
        try {
            await ItemService.deleteItem(id);
            loadItems();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Админ: Items</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div>Загрузка...</div>}

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row mb-2">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Название"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            placeholder="Цена"
                            value={form.price}
                            min="0"
                            step="0.01"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">
                            {editingId ? 'Обновить' : 'Создать'}
                        </button>
                    </div>
                </div>
            </form>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(item)}>Редактировать</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminItems;
