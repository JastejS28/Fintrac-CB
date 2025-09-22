import React, { useState } from 'react';

const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

function GoalList({ goals, onUpdateGoal, onDeleteGoal }) {
  const [amountToAdd, setAmountToAdd] = useState({});

  const handleAmountChange = (goalId, value) => {
    setAmountToAdd(prev => ({ ...prev, [goalId]: value }));
  };

  const handleUpdate = (goalId) => {
    const value = parseFloat(amountToAdd[goalId]);
    if (!isNaN(value) && value > 0) {
      onUpdateGoal(goalId, value);
      setAmountToAdd(prev => ({ ...prev, [goalId]: '' }));
    }
  };

  if (goals.length === 0) {
    return <p>No savings goals set yet.</p>;
  }

  return (
    <div className="goal-list">
      {goals.map(goal => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        const isCompleted = progress >= 100;
        
        return (
          <div key={goal._id} className={`goal-item ${isCompleted ? 'completed' : ''}`}>
            <div className="goal-header">
              <div className="goal-info">
                <h5 className="goal-name">
                  <span className="goal-icon">{isCompleted ? '🏆' : '🎯'}</span>
                  {goal.name}
                </h5>
                <div className="goal-amounts">
                  <span className="current-amount">{formatCurrency(goal.currentAmount)}</span>
                  <span className="goal-separator">/</span>
                  <span className="target-amount">{formatCurrency(goal.targetAmount)}</span>
                </div>
              </div>
              <div className="goal-progress-circle">
                <span className="progress-percentage">{Math.round(progress)}%</span>
              </div>
            </div>
            
            <div className="progress-container">
              <div 
                className="progress-bar goal"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
              </div>
            </div>
            
            {!isCompleted && (
              <div className="goal-actions">
                <div className="add-money-section">
                  <input
                    type="number"
                    placeholder="Add to savings (₹)"
                    value={amountToAdd[goal._id] || ''}
                    onChange={(e) => handleAmountChange(goal._id, e.target.value)}
                    className="add-amount-input"
                  />
                  <button 
                    onClick={() => handleUpdate(goal._id)} 
                    className="btn btn-primary add-btn"
                    disabled={!amountToAdd[goal._id] || parseFloat(amountToAdd[goal._id]) <= 0}
                  >
                    <span className="btn-icon">💰</span>
                    Add
                  </button>
                </div>
                <button 
                  onClick={() => onDeleteGoal(goal._id)} 
                  className="btn btn-danger delete-btn"
                  title="Delete Goal"
                >
                  <span className="btn-icon">🗑️</span>
                  Delete
                </button>
              </div>
            )}
            
            {isCompleted && (
              <div className="goal-completed">
                <span className="completed-message">🎉 Congratulations! Goal achieved!</span>
                <button 
                  onClick={() => onDeleteGoal(goal._id)} 
                  className="btn btn-secondary archive-btn"
                >
                  <span className="btn-icon">📦</span>
                  Archive Goal
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;