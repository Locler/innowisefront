import { Link } from 'react-router-dom';

function Navbar() {
    const roles = (localStorage.getItem('userRoles') || '').split(',');
    const isLoggedIn = !!localStorage.getItem('accessToken');

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow mb-4 py-3">
            <div className="container-fluid px-3">
                <Link className="navbar-brand fw-bold fs-2" to="/">Innowise</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item mx-3">
                                    <Link className="btn btn-outline-primary btn-lg" to="/profile">Профиль</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className="btn btn-outline-primary btn-lg" to="/cards">Карты</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className="btn btn-outline-primary btn-lg" to="/items">Товары</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className="btn btn-outline-primary btn-lg" to="/orders">Заказы</Link>
                                </li>
                                {roles.includes('ADMIN') && (
                                    <>
                                        <li className="nav-item mx-2">
                                            <Link className="btn btn-primary btn-lg" to="/admin/users">Админ — Пользователи</Link>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <Link className="btn btn-primary btn-lg" to="/admin/cards">Админ — Карты</Link>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <Link className="btn btn-primary btn-lg" to="/admin/items">Админ — Товары</Link>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <Link className="btn btn-primary btn-lg" to="/admin/orders">Админ — Заказы</Link>
                                        </li>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <li className="nav-item mx-3">
                                    <Link className="btn btn-outline-success btn-lg" to="/login">Вход</Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Link className="btn btn-outline-success btn-lg" to="/register">Регистрация</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
