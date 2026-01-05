import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTransactions, getMonthlySummary, getCategoryBreakdown, getBudgets, getGoals, exportTransactions } from '../services/api';
import { logout } from '../store/authActions';
import { useDispatch } from 'react-redux';
import SpendingPieChart from '../components/SpendingPieChart';
import ReactMarkdown from 'react-markdown';
import '../App.css';

function DashboardPage() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [breakdown, setBreakdown] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [assessment, setAssessment] = useState('');
  const [isAssessmentLoading, setIsAssessmentLoading] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    if (token) {
      setLoading(true);
      try {
        const [transactionsResponse, summaryResponse, breakdownResponse, budgetResponse, goalResponse] = await Promise.all([
          getTransactions(token),
          getMonthlySummary(token),
          getCategoryBreakdown(token),
          getBudgets(token),
          getGoals(token)
        ]);
        setTransactions(transactionsResponse.data.data);
        setSummary(summaryResponse.data.data);
        setBreakdown(breakdownResponse.data.data);
        setBudgets(budgetResponse.data.data);
        setGoals(goalResponse.data.data);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  const handleGetAssessment = async () => {
    setIsAssessmentLoading(true);
    setAssessment('');
    try {
      const response = await getFinancialAssessment(token);
      setAssessment(response.data.assessment);
    } catch (error) {
      console.error("Failed to get assessment", error);
      setAssessment('Sorry, I was unable to generate your financial assessment at this time.');
    } finally {
      setIsAssessmentLoading(false);
    }
  };

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

  const recentTransactions = transactions.slice(0, 5);
  const completedGoals = goals.filter(goal => goal.currentAmount >= goal.targetAmount).length;


  return (
    <div className="dashboard-container">
      {/* Navigation Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="brand">
            <h1 className="brand-title">FinTrac</h1>
            <span className="brand-subtitle">Personal Finance Tracker</span>
          </div>
          {user && <p className="welcome-msg">Welcome, {user.username}!</p>}
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={handleExport}>
            <span className="btn-icon">📊</span>
            Export Data
          </button>
          <button className="btn btn-logout" onClick={handleLogout}>
            <span className="btn-icon">🚪</span>
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Cards */}
      <div className="navigation-section">
        <div className="nav-cards">
          <div className="nav-card" onClick={() => navigate('/transactions')}>
            <div className="nav-icon">💰</div>
            <div className="nav-content">
              <h3>Transactions</h3>
              <p>Add and manage your income & expenses</p>
              <div className="nav-stats">
                <span>{transactions.length} total transactions</span>
              </div>
            </div>
            <div className="nav-arrow">→</div>
          </div>

          <div className="nav-card" onClick={() => navigate('/budgets')}>
            <div className="nav-icon">📊</div>
            <div className="nav-content">
              <h3>Budgets</h3>
              <p>Set spending limits and track progress</p>
              <div className="nav-stats">
                <span>{budgets.length} active budgets</span>
              </div>
            </div>
            <div className="nav-arrow">→</div>
          </div>

          <div className="nav-card" onClick={() => navigate('/goals')}>
            <div className="nav-icon">🎯</div>
            <div className="nav-content">
              <h3>Savings Goals</h3>
              <p>Set targets and achieve your dreams</p>
              <div className="nav-stats">
                <span>{goals.length} goals ({completedGoals} completed)</span>
              </div>
            </div>
            <div className="nav-arrow">→</div>
          </div>
        </div>
      </div>

      {/* AI Assessment Section */}
      {assessment && (
        <section className="card ai-assessment">
          <div className="card-header">
            <h2><span className="icon">🧠</span>AI Financial Assessment</h2>
          </div>
          <div className="assessment-content">
            <ReactMarkdown>{assessment}</ReactMarkdown>
          </div>
        </section>
      )}

      {/* Summary Cards Grid */}
      <div className="summary-section">
        <div className="summary-cards">
          <div className="summary-card income-card">
            <div className="summary-icon">💰</div>
            <div className="summary-content">
              <h3>Monthly Income</h3>
              <p className="summary-amount">
                {loading ? "Loading..." : summary ? formatCurrency(summary.income) : "₹0"}
              </p>
            </div>
          </div>
          
          <div className="summary-card expense-card">
            <div className="summary-icon">💸</div>
            <div className="summary-content">
              <h3>Monthly Expenses</h3>
              <p className="summary-amount">
                {loading ? "Loading..." : summary ? formatCurrency(summary.expense) : "₹0"}
              </p>
            </div>
          </div>

          <div className="summary-card savings-card">
            <div className="summary-icon">🏦</div>
            <div className="summary-content">
              <h3>Monthly Savings</h3>
              <p className="summary-amount">
                {loading ? "Loading..." : summary ? formatCurrency(summary.savings) : "₹0"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-content">
        {/* Left Column - Spending Chart */}
        <div className="left-column">
          <section className="card chart-card">
            <div className="card-header">
              <h2><span className="icon">📈</span>Spending Breakdown</h2>
            </div>
            <div className="chart-container">
              <SpendingPieChart data={breakdown} />
            </div>
          </section>
        </div>

        {/* Right Column - Recent Transactions */}
        <div className="right-column">
          <section className="card">
            <div className="card-header">
              <h2><span className="icon">�</span>Recent Transactions</h2>
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={() => navigate('/transactions')}
              >
                View All
              </button>
            </div>
            {loading ? (
              <div className="loading-state">Loading transactions...</div>
            ) : recentTransactions.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">�</span>
                <p>No transactions yet.</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate('/transactions')}
                >
                  Add First Transaction
                </button>
              </div>
            ) : (
              <div className="transaction-grid">
                {recentTransactions.map((tx) => (
                  <div key={tx._id} className={`transaction-item ${tx.type}`}>
                    <div className="transaction-info">
                      <div className="transaction-category">{tx.category}</div>
                      <div className="transaction-date">{new Date(tx.date).toLocaleDateString()}</div>
                      <div className="transaction-description">{tx.description}</div>
                    </div>
                    <div className={`transaction-amount ${tx.type}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="card">
        <div className="card-header">
          <h2><span className="icon">�</span>Quick Stats</h2>
        </div>
        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-icon">📝</span>
            <div className="stat-content">
              <h4>Total Transactions</h4>
              <p>{transactions.length}</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <div className="stat-content">
              <h4>Active Budgets</h4>
              <p>{budgets.length}</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <div className="stat-content">
              <h4>Savings Goals</h4>
              <p>{goals.length}</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🏆</span>
            <div className="stat-content">
              <h4>Goals Achieved</h4>
              <p>{completedGoals}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default DashboardPage;