import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTransactions, getMonthlySummary, getCategoryBreakdown,  getBudgets,getGoals, updateGoal, deleteGoal,  getFinancialAssessment  } from '../services/api'; // 1. Import getMonthlySummary
import { logout } from '../store/authActions';
import { useDispatch } from 'react-redux';
import TransactionForm from '../components/TransactionForm';
import SpendingPieChart from '../components/SpendingPieChart';
import BudgetForm from '../components/BudgetForm';
import BudgetList from '../components/BudgetList';
import GoalForm from '../components/GoalForm'; // 2. Import new components
import GoalList from '../components/GoalList';
import ReactMarkdown from 'react-markdown'; // 2. Import ReactMarkdown
import { exportTransactions } from '../services/api';
import '../App.css';

function DashboardPage() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null); // 2. Add state for the summary
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [breakdown, setBreakdown] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [assessment, setAssessment] = useState(''); 
  const [isAssessmentLoading, setIsAssessmentLoading] = useState(false);
  
// 3. Add state for the AI assessment


  const fetchDashboardData = useCallback(async () => {
    if (token) {
      setLoading(true);
      try {
        // 3. Fetch both sets of data in parallel for better performance
        const [transactionsResponse, summaryResponse, breakdownResponse, budgetResponse, goalResponse] = await Promise.all([
          getTransactions(token),
          getMonthlySummary(token),
          getCategoryBreakdown(token),
          getBudgets(token),
          getGoals(token)
        ]);
        setTransactions(transactionsResponse.data.data);
        setSummary(summaryResponse.data.data); // 4. Set the summary state
        setBreakdown(breakdownResponse.data.data); // 5. Set the breakdown state
        setBudgets(budgetResponse.data.data); // 6. Set the budget state
        setGoals(goalResponse.data.data); // 7. Set the goals state

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

// 6. Add a handler for updating a goal
  const handleUpdateGoal = async (goalId, amountToAdd) => {
    const goalToUpdate = goals.find(g => g._id === goalId);
    if (!goalToUpdate) return;

    const newCurrentAmount = goalToUpdate.currentAmount + amountToAdd;
    try {
      await updateGoal(goalId, { currentAmount: newCurrentAmount }, token);
      fetchDashboardData(); // Refresh all data
    } catch (error) {
      console.error("Failed to update goal", error);
    }
  };

  
  const handleDeleteGoal = async (goalId) => {
    // Optional: Add a confirmation before deleting
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteGoal(goalId, token);
        fetchDashboardData(); // Refresh all data after deleting
      } catch (error) {
        console.error("Failed to delete goal", error);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  // Format currency for display
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
      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions.csv'); // Set the filename
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Clean up the temporary link
    } catch (error) {
      console.error('Failed to export transactions', error);
      alert('Could not export transactions.');
    }
  };


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          {user && <p>Welcome, {user.username}!</p>}
        </div>
        <div>
          <button onClick={handleExport}>Export Transactions</button>
          <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>
        </div>
      </header>
      
      <section className="card">
        <h2>Monthly Summary</h2>
        {loading ? <p>Loading summary...</p> : summary ? (
          <div className="summary-grid">
            <p><strong>Income:</strong> {formatCurrency(summary.income)}</p>
            <p><strong>Expenses:</strong> {formatCurrency(summary.expense)}</p>
            <p><strong>Savings:</strong> {formatCurrency(summary.savings)}</p>
          </div>
        ) : <p>No summary data.</p>}
      </section>

      <section className="card">
        <h2>Manage Budgets</h2>
        {loading ? <p>Loading budgets...</p> : <BudgetList budgets={budgets} transactions={transactions} />}
        <BudgetForm onBudgetSet={fetchDashboardData} />
      </section>

      {/* You can wrap other sections in cards too */}
      <section className="card">
        <h2>Savings Goals</h2>
        {loading ? <p>Loading goals...</p> : <GoalList goals={goals} onUpdateGoal={handleUpdateGoal} onDeleteGoal={handleDeleteGoal} />}
        <GoalForm onGoalAdded={fetchDashboardData} />
      </section>

      <section className="card">
        <h2>Add Transaction</h2>
        <TransactionForm onTransactionAdded={fetchDashboardData} />
      </section>

      <section className="card">
        <h2>Recent Transactions</h2>
        {loading ? <p>Loading...</p> : (
          <ul>
            {transactions.map((tx) => (
              <li key={tx._id}>
                <span>{new Date(tx.date).toLocaleDateString()}: {tx.category} ({tx.type})</span>
                <span>{formatCurrency(tx.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
export default DashboardPage;