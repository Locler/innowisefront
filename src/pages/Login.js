import { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await AuthService.login(username, password);
            navigate('/'); // пока редирект на главную
        } catch (err) {
            setError(err.response?.data?.message || 'Неверный логин или пароль');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h3 className="card-title text-center mb-3">Вход в систему</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            className="form-control"
                            placeholder="Введите логин"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
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
                        />
                    </div>

                    <button className="btn btn-primary w-100">Войти</button>
                </form>

                <div className="mt-3 text-center">
                    <small>Нет аккаунта? <a href="/register">Зарегистрируйтесь</a></small>
                </div>
            </div>

        </div>
    );
}

export default Login;
