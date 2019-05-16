/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './AppReducer';
import dash from './DashReducer';
import budget from './BudgetReducer';
import auth from './AuthReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  dash,
  budget,
  auth
});
