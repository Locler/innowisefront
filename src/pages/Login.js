import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Логин и получение role + userId через validate
            const userData = await AuthService.login(username, password);

            setIsLoggedIn(true);

            // Навигация по роли
            navigate(
                userData.role === 'ROLE_ADMIN' ? '/admin' : '/profile',
                { replace: true }
            );

        } catch (err) {
            setError('Неверный логин или пароль');
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
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Войти
                    </button>
                </form>

                <div className="mt-3 text-center">
                    <small>Нет аккаунта? <a href="/register">Зарегистрируйтесь</a></small>
                </div>
            </div>
        </div>
    );
}

export default Login;
