import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createGoal } from '../services/api';

function GoalForm({ onGoalAdded }) {
  const { token } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createGoal({ name, targetAmount }, token);
      onGoalAdded(); // Notify the dashboard to refresh
      setName('');
      setTargetAmount('');
    } catch (err) {
      setError('Failed to add goal.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Create a New Goal</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" placeholder="Goal Name (e.g., New Phone)" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Target Amount" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} required />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;