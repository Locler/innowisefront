import React, { useEffect, useState } from 'react';
import PaymentService from '../../services/PaymentService';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filterUserId, setFilterUserId] = useState('');
  const [filterOrderId, setFilterOrderId] = useState('');

  const [form, setForm] = useState({
    orderId: '',
    userId: '',
    paymentAmount: 0,
    status: 'PENDING'
  });
  const [editingId, setEditingId] = useState(null);

  // Загрузка платежей по умолчанию (пустой список)
  useEffect(() => {
    loadAllPayments();
  }, []);

  const loadAllPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      // Можно загрузить все платежи через API или оставить пустым
      setPayments([]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const loadByUser = async () => {
    if (!filterUserId) return alert('Введите User ID');
    setLoading(true);
    setError(null);
    try {
      const res = await PaymentService.getPaymentsByUser(filterUserId);
      setPayments(res || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const loadByOrder = async () => {
    if (!filterOrderId) return alert('Введите Order ID');
    setLoading(true);
    setError(null);
    try {
      const res = await PaymentService.getPaymentsByOrder(filterOrderId);
      setPayments(res || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        await PaymentService.updateStatus(editingId, form.status);
        setEditingId(null);
      } else {
        await PaymentService.createPayment(form);
      }
      setForm({ orderId: '', userId: '', paymentAmount: 0, status: 'PENDING' });
      filterUserId
          ? await loadByUser()
          : filterOrderId
              ? await loadByOrder()
              : await loadAllPayments();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEdit = payment => {
    setForm({
      orderId: payment.orderId,
      userId: payment.userId,
      paymentAmount: payment.paymentAmount,
      status: payment.status
    });
    setEditingId(payment.id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Удалить платеж?')) return;
    try {
      await PaymentService.deletePayment(id);
      setPayments(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const updateStatus = async (paymentId, status) => {
    try {
      const updated = await PaymentService.updateStatus(paymentId, status);
      setPayments(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
      <div className="container mt-4">
        <h2>Админ: Платежи</h2>

        <div className="mb-3 d-flex gap-2">
          <input
              type="number"
              className="form-control"
              placeholder="User ID"
              value={filterUserId}
              onChange={e => setFilterUserId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={loadByUser}>
            По пользователю
          </button>

          <input
              type="number"
              className="form-control"
              placeholder="Order ID"
              value={filterOrderId}
              onChange={e => setFilterOrderId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={loadByOrder}>
            По заказу
          </button>
        </div>

        <form onSubmit={handleSubmit} className="card p-3 mb-4">
          <h5>{editingId ? 'Редактировать платеж' : 'Создать платеж'}</h5>
          <input
              type="number"
              className="form-control mb-2"
              name="orderId"
              placeholder="Order ID"
              value={form.orderId}
              onChange={handleChange}
              required
          />
          <input
              type="number"
              className="form-control mb-2"
              name="userId"
              placeholder="User ID"
              value={form.userId}
              onChange={handleChange}
              required
          />
          <input
              type="number"
              className="form-control mb-2"
              name="paymentAmount"
              placeholder="Сумма"
              value={form.paymentAmount}
              min="0"
              step="0.01"
              onChange={handleChange}
              required
          />
          <select
              className="form-control mb-2"
              name="status"
              value={form.status}
              onChange={handleChange}
              required
          >
            <option value="PENDING">PENDING</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="FAILED">FAILED</option>
          </select>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Обновить' : 'Создать'}
          </button>
        </form>

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
                          onClick={() => handleDelete(p.id)}
                      >
                        ✕
                      </button>
                      <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleEdit(p)}
                      >
                        Редактировать
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
