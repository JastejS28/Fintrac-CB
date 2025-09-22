import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addTransaction } from '../services/api.js';

function TransactionForm  ({onTransactionAdded}) {

  const { token } = useSelector((state) => state.auth)
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [error, setError] = useState('');


const handleSubmit= async(e)=>{
      e.preventDefault();
    setError('');

try{
    const transactionData= {amount, type, category, date, description}
    await addTransaction(transactionData, token);
    console.log('Transaction added successfully!');
    onTransactionAdded()
    //// Tell the dashboard to refresh
      // Reset form
      setAmount('');
      setCategory('');
      setDescription('');
}catch(err){
    setError('Failed to add transaction. Please try again.');
}
}


  return (
    <div className="transaction-form">
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-row">
          <input 
            type='number' 
            value={amount} 
            placeholder='Amount (₹)' 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="income">💰 Income</option>
            <option value="expense">💸 Expense</option>
          </select>
        </div>

        <div className="form-row">
          <input 
            type="text" 
            placeholder="Category (e.g., Food, Salary)" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
          />
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>

        <input 
          value={description} 
          type='text' 
          placeholder='Description' 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        
        <button type='submit' className="btn btn-primary">
          <span className="btn-icon">➕</span>
          Add Transaction
        </button>
      </form>
    </div>
  )
}


export default TransactionForm
