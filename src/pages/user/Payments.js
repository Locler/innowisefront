import React, { useEffect, useState } from 'react';
import PaymentService from '../../services/PaymentService';

function Payments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await PaymentService.getPaymentsByUser(userId);
            setPayments(res || []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Пользователь: Мои платежи</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div>Загрузка...</div>}

            {!loading && !error && (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order ID</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.orderId}</td>
                            <td>{p.paymentAmount?.toFixed(2) || 0} ₽</td>
                            <td>{p.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Payments;
