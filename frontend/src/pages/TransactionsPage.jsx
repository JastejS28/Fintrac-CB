import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getTransactions, exportTransactions } from '../services/api';
import TransactionForm from '../components/TransactionForm';
import '../App.css';

function TransactionsPage() {
  const { user, token } = useSelector((state) => state.auth);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const fetchTransactions = useCallback(async () => {
    if (token) {
      setLoading(true);
      try {
        const response = await getTransactions(token);
        setTransactions(response.data.data);
      } catch (err) {
        setError('Failed to fetch transactions.');
      } finally {
        setLoading(false);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  const handleExport = async () => {
    try {
      const response = await exportTransactions(token);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Failed to export transactions', error);
      alert('Could not export transactions.');
    }
  };

  const filteredTransactions = transactions
    .filter(tx => filter === 'all' || tx.type === filter)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="page-icon">💰</span>
            Transactions
          </h1>
          <p className="page-subtitle">Manage your income and expenses</p>
        </div>
        <div className="header-actions">
          <button onClick={handleExport} className="btn btn-secondary">
            <span className="btn-icon">📊</span>
            Export CSV
          </button>
        </div>
      </div>

      <div className="page-content">
        {/* Add Transaction Section */}
        <section className="card feature-card">
          <div className="card-header">
            <h2><span className="icon">➕</span>Add New Transaction</h2>
          </div>
          <TransactionForm onTransactionAdded={fetchTransactions} />
        </section>

        {/* Filters and Sort */}
        <section className="card">
          <div className="filters-section">
            <div className="filter-group">
              <label>Filter by Type:</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Transactions</option>
                <option value="income">Income Only</option>
                <option value="expense">Expenses Only</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Date (Newest First)</option>
                <option value="amount">Amount (Highest First)</option>
                <option value="category">Category (A-Z)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Transactions List */}
        <section className="card">
          <div className="card-header">
            <h2>
              <span className="icon">📋</span>
              Transaction History ({filteredTransactions.length})
            </h2>
          </div>
          
          {loading ? (
            <div className="loading-state">Loading transactions...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📝</span>
              <p>No transactions found. Add your first transaction above!</p>
            </div>
          ) : (
            <div className="transactions-grid">
              {filteredTransactions.map((tx) => (
                <div key={tx._id} className={`transaction-card ${tx.type}`}>
                  <div className="transaction-main">
                    <div className="transaction-info">
                      <h4 className="transaction-category">{tx.category}</h4>
                      <p className="transaction-description">{tx.description}</p>
                      <span className="transaction-date">
                        {new Date(tx.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="transaction-amount-section">
                      <div className={`transaction-amount ${tx.type}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </div>
                      <span className={`transaction-type ${tx.type}`}>
                        {tx.type === 'income' ? '💰' : '💸'} {tx.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default TransactionsPage;
