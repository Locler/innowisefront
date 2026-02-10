import { Navigate } from 'react-router-dom';

function PrivateRoute({ isLoggedIn, roles = [], userRole, children }) {
    if (isLoggedIn === null) {
        return <div className="text-center mt-5">Загрузка профиля...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (roles.length && !roles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PrivateRoute;
