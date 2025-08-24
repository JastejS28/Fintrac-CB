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
    <div>
      {goals.map(goal => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        return (
          <div key={goal._id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>{goal.name}</span>
              <span>{formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#eee', borderRadius: '5px', marginTop: '0.5rem' }}>
              <div style={{
                width: `${Math.min(progress, 100)}%`,
                height: '20px',
                backgroundColor: '#0F9D58',
                borderRadius: '5px',
              }}>
              </div>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <input
                type="number"
                placeholder="Add to savings"
                value={amountToAdd[goal._id] || ''}
                onChange={(e) => handleAmountChange(goal._id, e.target.value)}
              />
              <button onClick={() => handleUpdate(goal._id)}>Add</button>
              <button 
                onClick={() => onDeleteGoal(goal._id)} 
                style={{ marginLeft: '0.5rem', backgroundColor: '#DB4437', color: 'white' }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;