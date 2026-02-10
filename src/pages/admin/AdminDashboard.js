import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
        <div className="container mt-4">
            <h1 className="mb-4">Админ-панель</h1>
            <div className="row g-3">
                <div className="col-md-4"><Link to="/admin/users" className="btn btn-primary w-100 py-3">Пользователи</Link></div>
                <div className="col-md-4"><Link to="/admin/cards" className="btn btn-primary w-100 py-3">Карты</Link></div>
                <div className="col-md-4"><Link to="/admin/items" className="btn btn-primary w-100 py-3">Товары</Link></div>
                <div className="col-md-4"><Link to="/admin/orders" className="btn btn-primary w-100 py-3">Заказы</Link></div>
                <div className="col-md-4"><Link to="/admin/payments" className="btn btn-primary w-100 py-3">Платежи</Link></div>
            </div>
        </div>
    );
}

export default AdminDashboard;
