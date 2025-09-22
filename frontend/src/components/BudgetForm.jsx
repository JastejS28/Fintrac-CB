import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { setBudget } from '../services/api';

function BudgetForm({ onBudgetSet }) {
  const { token } = useSelector((state) => state.auth);
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await setBudget({ category, limit }, token);
      onBudgetSet(); // Notify the dashboard to refresh data
      setCategory('');
      setLimit('');
    } catch (err) {
      setError('Failed to set budget.');
    }
  };

  return (
    <div className="budget-form">
      <form onSubmit={handleSubmit}>
        <h4>📊 Set Budget Limit</h4>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-row">
          <input 
            type="text" 
            placeholder="Category (e.g., Food, Entertainment)" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
          />
          <input 
            type="number" 
            placeholder="Monthly Limit (₹)" 
            value={limit} 
            onChange={(e) => setLimit(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          <span className="btn-icon">💰</span>
          Set Budget
        </button>
      </form>
    </div>
  );
}

export default BudgetForm;