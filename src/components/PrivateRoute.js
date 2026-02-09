import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, roles }) {
    const token = localStorage.getItem('accessToken');
    const userRoles = (localStorage.getItem('userRoles') || '').split(',');

    if (!token) return <Navigate to="/login" replace />;

    if (roles && !roles.some(r => userRoles.includes(r))) {
        return <Navigate to="/profile" replace />; // обычный пользователь не имеет доступа
    }

    return children;
}

export default PrivateRoute;
