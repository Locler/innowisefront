import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Cards from './pages/user/Cards';
import Users from './pages/user/Users';
import OrderItems from './pages/user/OrderItems';
import Orders from './pages/user/Orders';
import Items from './pages/user/Items';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCards from './pages/admin/AdminCards';
import AdminItems from './pages/admin/AdminItems';
import AdminOrderItems from './pages/admin/AdminOrderItems';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminOrders from "./pages/admin/AdminOrders";

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
                    <Route path="/items" element={
                        <PrivateRoute>
                            <Items />
                        </PrivateRoute>
                    } />
                    <Route path="/order-items" element={
                        <PrivateRoute>
                            <OrderItems />
                        </PrivateRoute>
                    } />
                    <Route path="/orders" element={
                        <PrivateRoute>
                            <Orders/>
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
                    <Route path="/admin/items" element={
                        <PrivateRoute roles={['ADMIN']}>
                            <AdminItems />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/order-items" element={
                        <PrivateRoute roles={['ADMIN']}>
                            <AdminOrderItems />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/orders" element={
                        <PrivateRoute roles={['ADMIN']}>
                            <AdminOrders/>
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
