import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getGoals, updateGoal, deleteGoal } from '../services/api';
import GoalForm from '../components/GoalForm';
import GoalList from '../components/GoalList';
import '../App.css';

function GoalsPage() {
  const { token } = useSelector((state) => state.auth);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchGoals = useCallback(async () => {
    if (token) {
      setLoading(true);
      try {
        const response = await getGoals(token);
        setGoals(response.data.data);
      } catch (err) {
        setError('Failed to fetch goals.');
      } finally {
        setLoading(false);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleUpdateGoal = async (goalId, amountToAdd) => {
    const goalToUpdate = goals.find(g => g._id === goalId);
    if (!goalToUpdate) return;

    const newCurrentAmount = goalToUpdate.currentAmount + amountToAdd;
    try {
      await updateGoal(goalId, { currentAmount: newCurrentAmount }, token);
      fetchGoals();
    } catch (error) {
      console.error("Failed to update goal", error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteGoal(goalId, token);
        fetchGoals();
      } catch (error) {
        console.error("Failed to delete goal", error);
      }
    }
  };

  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSavedAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const completedGoals = goals.filter(goal => goal.currentAmount >= goal.targetAmount).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="page-icon">🎯</span>
            Savings Goals
          </h1>
          <p className="page-subtitle">Set targets and track your progress</p>
        </div>
      </div>

      <div className="page-content">
        {/* Goals Overview */}
        <div className="summary-section">
          <div className="summary-cards">
            <div className="summary-card goals-total">
              <div className="summary-icon">🎯</div>
              <div className="summary-content">
                <h3>Total Goals</h3>
                <p className="summary-amount">{goals.length}</p>
              </div>
            </div>
            
            <div className="summary-card goals-completed">
              <div className="summary-icon">🏆</div>
              <div className="summary-content">
                <h3>Completed</h3>
                <p className="summary-amount">{completedGoals}</p>
              </div>
            </div>

            <div className="summary-card goals-saved">
              <div className="summary-icon">💰</div>
              <div className="summary-content">
                <h3>Total Saved</h3>
                <p className="summary-amount">{formatCurrency(totalSavedAmount)}</p>
              </div>
            </div>

            <div className="summary-card goals-target">
              <div className="summary-icon">🎯</div>
              <div className="summary-content">
                <h3>Target Amount</h3>
                <p className="summary-amount">{formatCurrency(totalTargetAmount)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        {goals.length > 0 && (
          <section className="card">
            <div className="card-header">
              <h2><span className="icon">📈</span>Overall Progress</h2>
            </div>
            <div className="overall-progress">
              <div className="progress-stats">
                <div className="stat">
                  <span className="stat-label">Progress:</span>
                  <span className="stat-value">
                    {Math.round((totalSavedAmount / totalTargetAmount) * 100)}%
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Remaining:</span>
                  <span className="stat-value">
                    {formatCurrency(totalTargetAmount - totalSavedAmount)}
                  </span>
                </div>
              </div>
              <div className="progress-container large">
                <div 
                  className="progress-bar goal"
                  style={{ width: `${Math.min((totalSavedAmount / totalTargetAmount) * 100, 100)}%` }}
                >
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Create Goal Section */}
        <section className="card feature-card">
          <div className="card-header">
            <h2><span className="icon">➕</span>Create New Goal</h2>
          </div>
          <GoalForm onGoalAdded={fetchGoals} />
        </section>

        {/* Goals List */}
        <section className="card">
          <div className="card-header">
            <h2>
              <span className="icon">📋</span>
              Your Goals ({goals.length})
            </h2>
          </div>
          
          {loading ? (
            <div className="loading-state">Loading goals...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : goals.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🎯</span>
              <p>No savings goals yet. Create your first goal above!</p>
            </div>
          ) : (
            <GoalList 
              goals={goals} 
              onUpdateGoal={handleUpdateGoal} 
              onDeleteGoal={handleDeleteGoal} 
            />
          )}
        </section>

        {/* Goals Tips */}
        <section className="card tips-card">
          <div className="card-header">
            <h2><span className="icon">💡</span>Goal Setting Tips</h2>
          </div>
          <div className="tips-content">
            <div className="tip-item">
              <span className="tip-icon">🎯</span>
              <div>
                <h4>Be Specific</h4>
                <p>Set clear, specific goals with exact target amounts and deadlines.</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">🔢</span>
              <div>
                <h4>Break It Down</h4>
                <p>Divide large goals into smaller, manageable monthly or weekly targets.</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">🎉</span>
              <div>
                <h4>Celebrate Milestones</h4>
                <p>Reward yourself when you reach 25%, 50%, and 75% of your goal.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default GoalsPage;
