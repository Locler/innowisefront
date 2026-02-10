import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, roles = [], isLoggedIn }) {
    const userRoles = (localStorage.getItem('userRoles') || '').split(',');

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (roles.length > 0 && !roles.some(role => userRoles.includes(role))) {
        return <Navigate to="/profile" replace />;
    }

    return children;
}

export default PrivateRoute;
