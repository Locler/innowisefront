import {Link} from 'react-router-dom';
import axios from 'axios';

function Navbar({isLoggedIn, setIsLoggedIn}) {
    const role = localStorage.getItem('userRole');
    const isAdmin = role === 'ROLE_ADMIN';

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        delete axios.defaults.headers.common['Authorization'];
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow mb-4 py-3">
            <div className="container-fluid px-3">
                <Link className="navbar-brand fw-bold fs-2" to="/">Innowise</Link>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center">
                        {!isLoggedIn && (
                            <>
                                <li className="nav-item mx-2"><Link className="btn btn-outline-success btn-lg"
                                                                    to="/login">Вход</Link></li>
                                <li className="nav-item mx-2"><Link className="btn btn-outline-success btn-lg"
                                                                    to="/register">Регистрация</Link></li>
                            </>
                        )}

                        {isLoggedIn && !isAdmin && (
                            <>
                                <li className="nav-item mx-2"><Link className="btn btn-outline-primary btn-lg"
                                                                    to="/profile">Профиль</Link></li>
                                <li className="nav-item mx-2"><Link className="btn btn-outline-primary btn-lg"
                                                                    to="/cards">Карты</Link></li>
                                <li className="nav-item mx-2"><Link className="btn btn-outline-primary btn-lg"
                                                                    to="/items">Товары</Link></li>
                                <li className="nav-item mx-2"><Link className="btn btn-outline-primary btn-lg"
                                                                    to="/orders">Заказы</Link></li>
                                <li className="nav-item mx-2"><Link className="btn btn-outline-primary btn-lg"
                                                                    to="/payments">Платежи</Link></li>
                            </>
                        )}

                        {isLoggedIn && isAdmin && (
                            <>
                                <li className="nav-item mx-2"><Link className="btn btn-primary btn-lg"
                                                                    to="/admin">Дашборд</Link></li>
                                <li className="nav-item mx-2"><Link className="btn btn-primary btn-lg"
                                                                    to="/admin/users">Пользователи</Link></li>
                                <li className="nav-item mx-2"><Link className="btn btn-primary btn-lg"
                                                                    to="/admin/cards">Карты</Link></li>
                                <li className="nav-item mx-2"><Link className="btn btn-primary btn-lg"
                                                                    to="/admin/items">Товары</Link></li>
                                <li className="nav-item mx-2"><Link className="btn btn-primary btn-lg"
                                                                    to="/admin/orders">Заказы</Link></li>
                                <li className="nav-item mx-2"><Link className="btn btn-primary btn-lg"
                                                                    to="/admin/payments">Платежи</Link></li>
                            </>
                        )}

                        {isLoggedIn && (
                            <li className="nav-item mx-2">
                                <button className="btn btn-danger btn-lg" onClick={handleLogout}>Выйти</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
