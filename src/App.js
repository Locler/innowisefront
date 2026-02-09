import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Cards from './pages/user/Cards';
import Users from './pages/user/Users';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCards from './pages/admin/AdminCards';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <Navbar /> {/* выводим вне Routes */}
            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* обычный пользователь */}
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <Users />
                        </PrivateRoute>
                    } />
                    <Route path="/cards" element={
                        <PrivateRoute>
                            <Cards />
                        </PrivateRoute>
                    } />

                    {/* админ */}
                    <Route path="/admin/users" element={
                        <PrivateRoute roles={['ADMIN']}>
                            <AdminUsers />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/cards" element={
                        <PrivateRoute roles={['ADMIN']}>
                            <AdminCards />
                        </PrivateRoute>
                    } />

                    {/* fallback */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
