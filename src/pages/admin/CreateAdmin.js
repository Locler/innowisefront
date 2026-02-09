
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../..//services/AuthService';

function CreateAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const role = AuthService.getRole();

    // Доступ только для админа
    if (role !== 'ADMIN') {
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // Формируем тело запроса как требует RegistrationController
            const body = {
                credentials: {
                    username,
                    password,
                    role: 'ROLE_ADMIN', // всегда админ
                },
                profile: {
                    name,
                    surname,
                    email,
                    birthDate,
                },
            };

            await AuthService.register(Date.now(), body.credentials.username, body.credentials.password, body.credentials.role, body.profile);
            setSuccess('Админ успешно создан!');
            setUsername('');
            setPassword('');
            setName('');
            setSurname('');
            setEmail('');
            setBirthDate('');
        } catch (err) {
            setError(err.response?.data?.error?.message || 'Не удалось создать админа');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '500px' }}>
                <h3 className="card-title text-center mb-4">Создать нового администратора</h3>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите логин"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Имя</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите имя"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Фамилия</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите фамилию"
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Введите email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Дата рождения</label>
                        <input
                            type="date"
                            className="form-control"
                            value={birthDate}
                            onChange={e => setBirthDate(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn btn-primary w-100 mt-3">Создать администратора</button>
                </form>
            </div>
        </div>
    );
}

export default CreateAdmin;
