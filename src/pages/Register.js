import { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const body = {
                credentials: {
                    username,
                    password,
                    role: 'ROLE_USER'
                },
                profile: {
                    name,
                    surname,
                    email,
                    birthDate
                }
            };

            await AuthService.register(body);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error?.message || 'Регистрация не удалась');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h3 className="card-title text-center mb-4">Регистрация</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Имя</label>
                        <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Фамилия</label>
                        <input className="form-control" value={surname} onChange={e => setSurname(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Дата рождения</label>
                        <input type="date" className="form-control" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
                    </div>

                    <button className="btn btn-primary w-100">Зарегистрироваться</button>
                </form>

                <div className="mt-3 text-center">
                    <small>Уже есть аккаунт? <a href="/login">Войдите</a></small>
                </div>
            </div>
        </div>
    );
}

export default Register;
