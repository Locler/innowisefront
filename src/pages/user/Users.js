import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({ name: '', surname: '', email: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // id текущего пользователя
        loadUser(userId);
    }, []);

    const loadUser = async (id) => {
        try {
            const res = await UserService.getUserById(id);
            setUser(res.data);
            setForm({ name: res.data.name, surname: res.data.surname, email: res.data.email });
        } catch {
            setError('Не удалось загрузить профиль');
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await UserService.updateUser(user.id, form);
            alert('Профиль обновлён');
        } catch {
            setError('Ошибка обновления');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div>Загрузка...</div>;

    return (
        <div className="container mt-4">
            <h2>Мой профиль</h2>
            <form onSubmit={handleSubmit} className="card p-3 mb-4">
                <input className="form-control mb-2" name="name" value={form.name} onChange={handleChange} required />
                <input className="form-control mb-2" name="surname" value={form.surname} onChange={handleChange} required />
                <input className="form-control mb-2" name="email" type="email" value={form.email} onChange={handleChange} required />
                {error && <div className="alert alert-danger">{error}</div>}
                <button className="btn btn-primary" disabled={loading}>{loading ? 'Сохранение...' : 'Сохранить'}</button>
            </form>
        </div>
    );
}

export default Users;
