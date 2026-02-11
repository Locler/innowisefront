import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({ name: '', surname: '', email: '', birthDate: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            loadUser(userId);
        } else {
            setError('Нет ID пользователя');
        }
    }, []);

    const loadUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await UserService.getUserById(id); // data уже res.data
            setUser(data);
            setForm({
                name: data.name || '',
                surname: data.surname || '',
                email: data.email || '',
                birthDate: data.birthDate || ''
            });
        } catch (e) {
            console.error(e);
            setError(e.response?.data?.message || e.message || 'Не удалось загрузить профиль');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await UserService.updateUser(user.id, form);
            alert('Профиль успешно обновлён');
            loadUser(user.id); // Обновляем данные после сохранения
        } catch (e) {
            console.error(e);
            setError(e.response?.data?.message || e.message || 'Ошибка обновления профиля');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !user) return <div className="mt-4">Загрузка профиля...</div>;
    if (error && !user) return <div className="mt-4 alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Мой профиль</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="card p-3 mb-4">
                <div className="mb-3">
                    <label className="form-label">Имя</label>
                    <input
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Фамилия</label>
                    <input
                        className="form-control"
                        name="surname"
                        value={form.surname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Дата рождения</label>
                    <input
                        type="date"
                        className="form-control"
                        name="birthDate"
                        value={form.birthDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
            </form>
        </div>
    );
}

export default Users;
