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
    <div>
      {/* We .map() over the 'budgets' array. For each 'budget' object, we create a block of JSX. */}
      {budgets.map(budget => {
        // For each budget, we call our helper function to get the total amount spent in that category.
        const spent = calculateSpending(budget.category);
        // We calculate the spending progress as a percentage.
        const progress = (spent / budget.limit) * 100;
        
        return (
          // The main container for a single budget's display.
          <div key={budget._id} style={{ /*...*/ }}>
            {/* This div displays the category name on the left and the 'spent / limit' on the right. */}
            <div style={{ /*...*/ }}>
              <span>{budget.category}</span>
              <span>{formatCurrency(spent)} / {formatCurrency(budget.limit)}</span>
            </div>
            {/* This div is the gray background of the progress bar. */}
            <div style={{ /*...*/ }}>
              {/* This is the colored part of the progress bar. */}
              <div style={{
                // Its width is set to the calculated percentage. Math.min ensures it doesn't go over 100%.
                width: `${Math.min(progress, 100)}%`,
                height: '20px',
                // The background color is red if the progress is over 100%, otherwise it's blue.
                backgroundColor: progress > 100 ? '#DB4437' : '#4285F4',
                // ...
              }}>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BudgetList;