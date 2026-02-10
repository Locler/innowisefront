import { Navigate } from 'react-router-dom';

function PrivateRoute({ isLoggedIn, roles = [], children }) {
    if (!isLoggedIn) {
        // Если не залогинен — редирект на login
        return <Navigate to="/login" replace />;
    }

    if (roles.length > 0) {
        const userRole = localStorage.getItem('userRole'); // одиночная роль
        if (!roles.includes(userRole)) {
            // Если роль не подходит — редирект на главную для пользователя
            return <Navigate to="/profile" replace />;
        }
    }

    return children;
}

export default PrivateRoute;
