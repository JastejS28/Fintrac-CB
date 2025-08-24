import axios from 'axios'

const API_URL= 'http://localhost:4000/api/v1'

const api= axios.create({
    baseURL: API_URL,
})

export const registerUser = (userData)=> api.post('/user/register', userData)
export const loginUser= (userData)=> api.post('/user/login',userData)
export const getTransactions= (token)=>{
    return api.get('/transaction',{
        headers: {
            Authorization: `Bearer ${token}`   //I am giving token data in backend
        }
    })
}
export const addTransaction= (transactionData, token)=>{
    return api.post('/transaction',transactionData,{
        headers: {
            Authorization: `Bearer ${token}`   
        }
    })
}

export const getMonthlySummary = (token)=>{
    return api.get('/report/monthly-summary',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const getCategoryBreakdown = (token)=>{
    return api.get('/report/category-breakdown',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getBudgets= (token)=>{
    return api.get('/budgets',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const setBudget= ( budgetData, token)=>{
    return api.post('/budgets', budgetData, {
        headers: {Authorization: `Bearer ${token}`}
    })
}

export const getGoals = (token) => {
  // Use the '/goal/getGoals' path
  return api.get('/goal/getGoals', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createGoal = (goalData, token) => {
  // Use the '/goal/addGoal' path
  return api.post('/goal/addGoal', goalData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateGoal = (id, goalData, token) => {
  // Use the '/goal/updateGoal/:id' path
  return api.put(`/goal/updateGoal/${id}`, goalData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteGoal= (id, token)=>{
    return api.delete(`/goal/deleteGoal/${id}`,{
        headers: { Authorization: `Bearer ${token}` },
    })
}

export const getFinancialAssessment = (token) => {
  // We use POST as defined in the backend route
  return api.post('/ai/financial-assessment', {}, { // Send an empty object as the body
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const exportTransactions = (token) => {
  return api.post('/report/export', {}, { // Send empty body
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob', // Important: expect a binary file blob back
  });
};

export default api;