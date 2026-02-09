import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', surname: '', email: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const roles = localStorage.getItem('userRoles');
        if (!roles?.includes('ADMIN')) {
            alert('Нет доступа!');
            return;
        }
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await UserService.getAllUsers();
            setUsers(res.data.content || []);
        } catch {
            setError('Не удалось загрузить пользователей');
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            if (editingId) {
                await UserService.updateUser(editingId, form);
            } else {
                await UserService.createUser(form);
            }
            setForm({ name: '', surname: '', email: '' });
            setEditingId(null);
            await loadUsers();
        } catch (e) {
            setError(e.response?.data?.message || 'Ошибка запроса');
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (user) => {
        setEditingId(user.id);
        setForm({ name: user.name, surname: user.surname, email: user.email });
        setError(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Удалить пользователя?')) return;
        await UserService.deleteUser(id);
        loadUsers();
    };

    const toggleActive = async (user) => {
        if (user.active) await UserService.deactivateUser(user.id);
        else await UserService.activateUser(user.id);
        loadUsers();
    };

    return (
        <div className="container mt-4">
            <h2>Панель администратора — Пользователи</h2>

            <form onSubmit={handleSubmit} className="card p-3 mb-4">
                <h5>{editingId ? 'Редактировать пользователя' : 'Создать пользователя'}</h5>
                <input className="form-control mb-2" name="name" placeholder="Имя" value={form.name} onChange={handleChange} required />
                <input className="form-control mb-2" name="surname" placeholder="Фамилия" value={form.surname} onChange={handleChange} required />
                <input type="email" className="form-control mb-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                {error && <div className="alert alert-danger">{error}</div>}
                <button className="btn btn-primary" disabled={loading}>{loading ? 'Сохранение...' : 'Сохранить'}</button>
            </form>

            <ul className="list-group">
                {users.map(user => (
                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{user.name} {user.surname}</strong> — {user.email} <br />
                            Активен: {user.active ? 'Да' : 'Нет'}
                        </div>
                        <div>
                            <button className="btn btn-sm btn-secondary me-2" onClick={() => startEdit(user)}>Редактировать</button>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => toggleActive(user)}>{user.active ? 'Деактивировать' : 'Активировать'}</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Удалить</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminUsers;
