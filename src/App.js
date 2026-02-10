import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Login from './pages/Login';
import Register from './pages/Register';
import Cards from './pages/user/Cards';
import Users from './pages/user/Users';
import OrderItems from './pages/user/OrderItems';
import Orders from './pages/user/Orders';
import Items from './pages/user/Items';
import Payments from './pages/user/Payments';

import AdminUsers from './pages/admin/AdminUsers';
import AdminCards from './pages/admin/AdminCards';
import AdminItems from './pages/admin/AdminItems';
import AdminOrderItems from './pages/admin/AdminOrderItems';
import AdminOrders from './pages/admin/AdminOrders';
import AdminPayments from './pages/admin/AdminPayments';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

            <div className="container">
                <Routes>

                    {/* auth */}
                    <Route
                        path="/login"
                        element={
                            isLoggedIn
                                ? <Navigate to="/profile" replace />
                                : <Login setIsLoggedIn={setIsLoggedIn} />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            isLoggedIn
                                ? <Navigate to="/profile" replace />
                                : <Register />
                        }
                    />

                    {/* user */}
                    <Route path="/profile" element={<PrivateRoute isLoggedIn={isLoggedIn}><Users /></PrivateRoute>} />
                    <Route path="/cards" element={<PrivateRoute isLoggedIn={isLoggedIn}><Cards /></PrivateRoute>} />
                    <Route path="/items" element={<PrivateRoute isLoggedIn={isLoggedIn}><Items /></PrivateRoute>} />
                    <Route path="/order-items" element={<PrivateRoute isLoggedIn={isLoggedIn}><OrderItems /></PrivateRoute>} />
                    <Route path="/orders" element={<PrivateRoute isLoggedIn={isLoggedIn}><Orders /></PrivateRoute>} />
                    <Route path="/payments" element={<PrivateRoute isLoggedIn={isLoggedIn}><Payments /></PrivateRoute>} />

                    {/* admin */}
                    <Route path="/admin/users" element={<PrivateRoute isLoggedIn={isLoggedIn} roles={['ROLE_ADMIN']}><AdminUsers /></PrivateRoute>} />
                    <Route path="/admin/cards" element={<PrivateRoute isLoggedIn={isLoggedIn} roles={['ROLE_ADMIN']}><AdminCards /></PrivateRoute>} />
                    <Route path="/admin/items" element={<PrivateRoute isLoggedIn={isLoggedIn} roles={['ROLE_ADMIN']}><AdminItems /></PrivateRoute>} />
                    <Route path="/admin/order-items" element={<PrivateRoute isLoggedIn={isLoggedIn} roles={['ROLE_ADMIN']}><AdminOrderItems /></PrivateRoute>} />
                    <Route path="/admin/orders" element={<PrivateRoute isLoggedIn={isLoggedIn} roles={['ROLE_ADMIN']}><AdminOrders /></PrivateRoute>} />
                    <Route path="/admin/payments" element={<PrivateRoute isLoggedIn={isLoggedIn} roles={['ROLE_ADMIN']}><AdminPayments /></PrivateRoute>} />

                    {/* fallback */}
                    <Route
                        path="*"
                        element={
                            isLoggedIn
                                ? <Navigate to="/profile" replace />
                                : <Navigate to="/login" replace />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
