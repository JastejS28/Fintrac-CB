import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getBudgets, getTransactions } from '../services/api';
import BudgetForm from '../components/BudgetForm';
import BudgetList from '../components/BudgetList';
import '../App.css';

function BudgetsPage() {
  const { token } = useSelector((state) => state.auth);
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    if (token) {
      setLoading(true);
      try {
        const [budgetResponse, transactionResponse] = await Promise.all([
          getBudgets(token),
          getTransactions(token)
        ]);
        setBudgets(budgetResponse.data.data);
        setTransactions(transactionResponse.data.data);
      } catch (err) {
        setError('Failed to fetch budget data.');
      } finally {
        setLoading(false);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgets.reduce((sum, budget) => {
    const spent = transactions
      .filter(tx => tx.category === budget.category && tx.type === 'expense')
      .reduce((categorySum, tx) => categorySum + tx.amount, 0);
    return sum + spent;
  }, 0);

  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="page-icon">📊</span>
            Budget Management
          </h1>
          <p className="page-subtitle">Set limits and track your spending</p>
        </div>
      </div>

      <div className="page-content">
        {/* Budget Overview */}
        <div className="summary-section">
          <div className="summary-cards">
            <div className="summary-card budget-summary">
              <div className="summary-icon">💰</div>
              <div className="summary-content">
                <h3>Total Budget</h3>
                <p className="summary-amount">{formatCurrency(totalBudget)}</p>
              </div>
            </div>
            
            <div className="summary-card expense-summary">
              <div className="summary-icon">💸</div>
              <div className="summary-content">
                <h3>Total Spent</h3>
                <p className="summary-amount">{formatCurrency(totalSpent)}</p>
              </div>
            </div>

            <div className="summary-card remaining-summary">
              <div className="summary-icon">🏦</div>
              <div className="summary-content">
                <h3>Remaining</h3>
                <p className="summary-amount">{formatCurrency(totalBudget - totalSpent)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Create Budget Section */}
        <section className="card feature-card">
          <div className="card-header">
            <h2><span className="icon">➕</span>Create New Budget</h2>
          </div>
          <BudgetForm onBudgetSet={fetchData} />
        </section>

        {/* Budget List */}
        <section className="card">
          <div className="card-header">
            <h2>
              <span className="icon">📋</span>
              Your Budgets ({budgets.length})
            </h2>
          </div>
          
          {loading ? (
            <div className="loading-state">Loading budgets...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : budgets.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📊</span>
              <p>No budgets set yet. Create your first budget above!</p>
            </div>
          ) : (
            <BudgetList budgets={budgets} transactions={transactions} />
          )}
        </section>

        {/* Budget Tips */}
        <section className="card tips-card">
          <div className="card-header">
            <h2><span className="icon">💡</span>Budget Tips</h2>
          </div>
          <div className="tips-content">
            <div className="tip-item">
              <span className="tip-icon">🎯</span>
              <div>
                <h4>Set Realistic Limits</h4>
                <p>Base your budgets on your actual spending patterns from previous months.</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📱</span>
              <div>
                <h4>Track Regularly</h4>
                <p>Check your budget progress weekly to stay on track with your financial goals.</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">⚖️</span>
              <div>
                <h4>Balance is Key</h4>
                <p>Allocate funds for both necessities and enjoyment to maintain a sustainable budget.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BudgetsPage;
