import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';

// You can combine reducers here if you have more
const rootReducer = {
  auth: authReducer,
  // other reducers can go here
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;