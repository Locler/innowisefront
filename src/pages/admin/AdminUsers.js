import React, { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({ name: '', surname: '', email: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await UserService.getAllUsers({ page: 0, size: 100 });
            setUsers(res.content || []);
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
                await UserService.updateUser(editingId, form);
                setEditingId(null);
            } else {
                await UserService.createUser(form);
            }
            setForm({ name: '', surname: '', email: '' });
            loadUsers();
        } catch (e) {
            setError(e.message);
        }
    };

    const handleEdit = user => {
        setForm({ name: user.name, surname: user.surname, email: user.email });
        setEditingId(user.id);
    };

    const handleDelete = async id => {
        if (!window.confirm('Удалить пользователя?')) return;
        setError(null);
        try {
            await UserService.deleteUser(id);
            loadUsers();
        } catch (e) {
            setError(e.message);
        }
    };

    const toggleActive = async user => {
        setError(null);
        try {
            if (user.active) await UserService.deactivateUser(user.id);
            else await UserService.activateUser(user.id);
            loadUsers();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Админ: Пользователи</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div>Загрузка пользователей...</div>}

            <form onSubmit={handleSubmit} className="card p-3 mb-4">
                <h5>{editingId ? 'Редактировать пользователя' : 'Создать пользователя'}</h5>
                <input
                    className="form-control mb-2"
                    name="name"
                    placeholder="Имя"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    className="form-control mb-2"
                    name="surname"
                    placeholder="Фамилия"
                    value={form.surname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    className="form-control mb-2"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="btn btn-primary">
                    {editingId ? 'Обновить' : 'Создать'}
                </button>
            </form>

            {!loading && users.length > 0 && (
                <ul className="list-group">
                    {users.map(user => (
                        <li
                            key={user.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong>{user.name} {user.surname}</strong> (ID: {user.id}) — {user.email} <br />
                                Активен: {user.active ? 'Да' : 'Нет'}
                            </div>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-warning"
                                    onClick={() => toggleActive(user)}
                                >
                                    {user.active ? 'Деактивировать' : 'Активировать'}
                                </button>
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => handleEdit(user)}
                                >
                                    Редактировать
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(user.id)}
                                >
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

export default AdminUsers;
