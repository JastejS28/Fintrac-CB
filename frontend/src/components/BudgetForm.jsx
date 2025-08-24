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
    <form onSubmit={handleSubmit}>
      <h4>Set a Budget</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" placeholder="Category (e.g., Food)" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input type="number" placeholder="Limit" value={limit} onChange={(e) => setLimit(e.target.value)} required />
      <button type="submit">Set Budget</button>
    </form>
  );
}

export default BudgetForm;