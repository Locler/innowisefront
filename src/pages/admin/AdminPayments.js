import React, { useEffect, useState } from 'react';
import PaymentService from '../../services/PaymentService';

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPaymentsByOrder = async () => {
    if (!orderId) {
      alert('Введите Order ID');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await PaymentService.getPaymentsByOrder(orderId);
      setPayments(res || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (paymentId, status) => {
    try {
      const updated = await PaymentService.updateStatus(paymentId, status.toUpperCase());
      // Локальное обновление списка
      setPayments(prev =>
          prev.map(p => (p.id === updated.id ? updated : p))
      );
    } catch (e) {
      alert(e.message);
    }
  };

  const deletePayment = async (paymentId) => {
    if (!window.confirm('Удалить платеж?')) return;
    try {
      await PaymentService.deletePayment(paymentId);
      setPayments(prev => prev.filter(p => p.id !== paymentId));
    } catch (e) {
      alert(e.message);
    }
  };

  return (
      <div className="container mt-4">
        <h2>Админ: Платежи</h2>

        <div className="mb-3 d-flex gap-2">
          <input
              type="number"
              className="form-control"
              placeholder="Order ID"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={loadPaymentsByOrder}>
            Найти
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <div>Загрузка...</div>}

        {!loading && payments.length > 0 && (
            <table className="table table-striped">
              <thead>
              <tr>
                <th>ID</th>
                <th>Order</th>
                <th>User ID</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
              </thead>
              <tbody>
              {payments.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.orderId}</td>
                    <td>{p.userId}</td>
                    <td>{p.paymentAmount?.toFixed(2) || 0} ₽</td>
                    <td>{p.status}</td>
                    <td className="d-flex gap-1">
                      <button
                          className="btn btn-sm btn-success"
                          onClick={() => updateStatus(p.id, 'SUCCESS')}
                      >
                        SUCCESS
                      </button>
                      <button
                          className="btn btn-sm btn-warning"
                          onClick={() => updateStatus(p.id, 'FAILED')}
                      >
                        FAILED
                      </button>
                      <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deletePayment(p.id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}

        {!loading && payments.length === 0 && !error && (
            <div>Платежи не найдены</div>
        )}
      </div>
  );
}

export default AdminPayments;
