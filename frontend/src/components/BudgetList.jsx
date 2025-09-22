import React from 'react';

// This is a helper function to format numbers as Indian Rupees (e.g., 5000 -> ₹5,000.00)
const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

// The component receives two props from the Dashboard: the list of 'budgets' and the list of 'transactions'.
function BudgetList({ budgets, transactions }) {
  
  // This is the core logic function. It calculates the total spent for a given category.
  const calculateSpending = (category) => {
    // It takes the full list of all transactions...
    return transactions
      // .filter(): First, it filters the list down to only the transactions that match two conditions:
      // 1. The transaction's category must match the budget category we're checking (e.g., 'Food').
      // 2. The transaction's type must be 'expense'.
      .filter(tx => tx.category === category && tx.type === 'expense')
      // .reduce(): Then, it takes the filtered list of expenses and "reduces" it to a single number.
      // It iterates through each transaction (tx) and adds its 'amount' to an accumulator (sum), starting from 0.
      .reduce((sum, tx) => sum + tx.amount, 0);
  };

  // If the user has not set any budgets, display a simple message.
  if (budgets.length === 0) {
    return <p>No budgets set yet.</p>;
  }

  // If there are budgets, we render the list.
  return (
    <div className="budget-list">
      {budgets.map(budget => {
        const spent = calculateSpending(budget.category);
        const progress = (spent / budget.limit) * 100;
        const isOverBudget = progress > 100;
        
        return (
          <div key={budget._id} className="budget-item">
            <div className="budget-header">
              <div className="budget-category">
                <span className="category-icon">🏷️</span>
                <span className="category-name">{budget.category}</span>
              </div>
              <div className="budget-amounts">
                <span className={`spent-amount ${isOverBudget ? 'over-budget' : ''}`}>
                  {formatCurrency(spent)}
                </span>
                <span className="budget-separator">/</span>
                <span className="limit-amount">{formatCurrency(budget.limit)}</span>
              </div>
            </div>
            
            <div className="progress-container">
              <div 
                className={`progress-bar budget ${isOverBudget ? 'over-budget' : ''}`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
              </div>
            </div>
            
            <div className="budget-status">
              <span className={`status-text ${isOverBudget ? 'over-budget' : ''}`}>
                {isOverBudget 
                  ? `⚠️ Over budget by ${formatCurrency(spent - budget.limit)}` 
                  : `✅ ${formatCurrency(budget.limit - spent)} remaining`
                }
              </span>
              <span className="progress-percentage">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BudgetList;